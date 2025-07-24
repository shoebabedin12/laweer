"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

interface User {
  id: string;
  name: string;
  profileImage?: string | null;
  // Add more fields if needed
}

interface Appointment {
  id: string;
  userId: string;
  lawyerId: string;
  date: string; // yyyy-mm-dd
  time: string; // HH:mm
  status: "pending" | "approved" | "rejected";
}

interface AppointmentWithClient extends Appointment {
  clientName: string;
  clientImage?: string | null;
}

export default function LawyerAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentWithClient[]>([]);
  const [loading, setLoading] = useState(false);
  const [lawyerId, setLawyerId] = useState<string | null>(null);

  // For demo, read lawyerId from localStorage or other auth context
  useEffect(() => {
    // Example: get lawyerId from stored token or auth context
    const storedLawyerId = localStorage.getItem("token");
    if (storedLawyerId) {
      setLawyerId(storedLawyerId);
    } else {
      // Redirect to login or show message
      toast.error("Lawyer not authenticated");
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    if (!lawyerId) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      // Fetch appointments for this lawyer
      const apptRes = await axios.get<Appointment[]>(
        `${process.env.NEXT_PUBLIC_APP_API_KEY}/appointments?lawyerId=${lawyerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Fetch all users (clients)
      const userRes = await axios.get<User[]>(
        `${process.env.NEXT_PUBLIC_APP_API_KEY}/users`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const usersMap: Record<string, User> = {};
      userRes.data.forEach((user) => {
        usersMap[user.id] = user;
      });

      const data: AppointmentWithClient[] = apptRes.data
        .map((appt) => {
          const client = usersMap[appt.userId];
          return {
            ...appt,
            clientName: client?.name || "Unknown",
            clientImage: client?.profileImage || null,
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
      console.error(error);
      toast.error("Failed to refresh appointments");
    } finally {
      setLoading(false);
    }
  }, [lawyerId]);

  useEffect(() => {
    if (lawyerId) {
      fetchAppointments();
    }
  }, [lawyerId, fetchAppointments]);

  // Update appointment status via API
  const handleStatusChange = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE}/appointments/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Appointment ${newStatus}`);
      fetchAppointments();
    } catch (error) {
      console.error("Status update failed", error);
      toast.error("Failed to update appointment status");
    } finally {
      setLoading(false);
    }
  };

  // Format time string (HH:mm) to localized format
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
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

      <div className="overflow-x-auto border rounded shadow">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Client</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
            {appointments.map((appt) => (
              <tr
                key={appt.id}
                className={`${
                  appt.status === "approved"
                    ? "text-green-600"
                    : appt.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                <td className="p-2 border">{appt.date}</td>
                <td className="p-2 border">{formatTime(appt.time)}</td>
                <td className="p-2 border flex items-center gap-2">
                  {appt.clientImage ? (
                    <img
                      src={appt.clientImage}
                      alt={appt.clientName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                      N/A
                    </div>
                  )}
                  <span>{appt.clientName}</span>
                </td>
                <td className="p-2 border capitalize">{appt.status}</td>
                <td className="p-2 border">
                  {appt.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange(appt.id, "approved")}
                        disabled={loading}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(appt.id, "rejected")}
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
