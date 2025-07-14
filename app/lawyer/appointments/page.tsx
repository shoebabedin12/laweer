/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function LawyerAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    const snapshot = await getDocs(collection(db, 'appointments'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      setLoading(true);
      const appointmentRef = doc(db, 'appointments', id);
      await updateDoc(appointmentRef, { status: newStatus });

      toast.success(`Appointment ${newStatus}`);
      fetchAppointments(); // Refresh the list
    } catch (error) {
      console.error('Status update failed', error);
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Appointments</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Client ID</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="p-2 border">{a.date}</td>
                <td className="p-2 border">{a.time}</td>
                <td className="p-2 border">{a.userId}</td>
                <td className="p-2 border capitalize">{a.status}</td>
                <td className="p-2 border">
                  {a.status === 'pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(a.id, 'approved')}
                        disabled={loading}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(a.id, 'rejected')}
                        disabled={loading}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">No action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
