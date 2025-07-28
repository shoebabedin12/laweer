/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarCheck } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
}

interface Appointment {
  id: string;
  date: string;
}

interface UserResponse {
  user: User;
}

interface AppointmentsResponse {
  appointments: Appointment[];
}

export default function LawyerHomePage() {
  const [lawyerName, setLawyerName] = useState<any>(null);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
 
      try {
        // 1. Get logged-in user info
        const userRes = await axios.get<UserResponse>(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userRes.data.user;
        
        setLawyerName(user);

        // 2. Get appointments for this lawyer
        // const apptRes = await axios.get<AppointmentsResponse>(
        //   `${API_BASE}/appointments/lawyer/${user.id}`,
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //   }
        // );

        // Filter upcoming appointments (today or later)
        const today = new Date();
        // const upcoming = apptRes.data.appointments.filter((appt: any) => {
        //   const apptDate = new Date(appt.date);
        //   // remove time portion for fair comparison
        //   return apptDate >= new Date(today.toDateString());
        // });

        // setAppointmentCount(upcoming.length);
      } catch (error) {
        console.error("Failed to fetch data", error);
        router.replace("/signin");
      }
    };

    fetchData();
  }, [router, API_BASE]);

  console.log(lawyerName);
  

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="grid grid-cols-12 gap-4">
        {/* Welcome Section */}
        <div className="col-span-6 bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-2">Welcome, {lawyerName} 👋</h1>
          <p className="text-gray-600">Here’s your overview for today.</p>
        </div>

        {/* Quick Action Cards */}
        <div className="col-span-6">
          <ActionCard
            title="Upcoming Appointments"
            icon={<FaCalendarCheck className="text-blue-600" size={32} />}
            count={appointmentCount.toString()}
            description="View and manage your upcoming schedules."
            href="/lawyer/appointments"
          />
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  icon,
  description,
  href,
  count,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  count: string;
}) {
  return (
    <Link
      href={href}
      className="block p-5 bg-white rounded-lg shadow hover:shadow-md transition"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-3xl font-bold mt-2">{count}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
