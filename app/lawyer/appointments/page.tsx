/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { FirestoreAppointment } from "@/types/DataTypes";

export default function LawyerAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lawyerId, setLawyerId] = useState<string | null>(null);

  // Fetch lawyer ID from auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLawyerId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchAppointments = useCallback(async () => {
    if (!lawyerId) return;

    try {
      setLoading(true);

      const [appointmentsSnap, usersSnap] = await Promise.all([
        getDocs(collection(db, "appointments")),
        getDocs(collection(db, "users")),
      ]);

      const usersMap: Record<string, any> = {};
      usersSnap.docs.forEach((doc) => {
        usersMap[doc.id] = doc.data();
      });

      const data = appointmentsSnap.docs
        .map((doc) => {
          const appointment = doc.data() as FirestoreAppointment;
          const client = usersMap[appointment.userId] || {};

          return {
            id: doc.id,
            userId: appointment.userId,
            lawyerId: appointment.lawyerId,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
            clientName: client.name || "Unknown",
            clientImage: client.profileImage || null,
          };
        })
        .filter((a) => a.lawyerId === lawyerId)
        .sort((a, b) => {
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          return dateB.getTime() - dateA.getTime();
        });

      setAppointments(data);
      toast.info("Appointment list refreshed");
    } catch (error) {
      toast.error("Failed to refresh");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [lawyerId]);

  useEffect(() => {
    if (lawyerId) {
      fetchAppointments();
    }
  }, [lawyerId, fetchAppointments]);

  // Handle Status Update
  const handleStatusChange = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      setLoading(true);
      const appointmentRef = doc(db, "appointments", id);
      await updateDoc(appointmentRef, { status: newStatus });

      toast.success(`Appointment ${newStatus}`);
      fetchAppointments();
    } catch (error) {
      console.error("Status update failed", error);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // Format time
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Appointments</h1>
        <button
          onClick={fetchAppointments}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Refreshing...
            </span>
          ) : (
            "Reload"
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Client</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr
                key={a.id}
                className={`${
                  a.status === "approved"
                    ? "text-green-600"
                    : a.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                <td className="p-2 border">{a.date}</td>
                <td className="p-2 border">{formatTime(a.time)}</td>
                <td className="p-2 border">
                  <div className="flex items-center gap-2">
                    <span>{a.clientName}</span>
                  </div>
                </td>
                <td className={`p-2 border capitalize`}>{a.status}</td>
                <td className="p-2 border">
                  {a.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(a.id, "approved")}
                        disabled={loading}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(a.id, "rejected")}
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
