"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FaCalendarCheck } from "react-icons/fa";
import Link from "next/link";

export default function LawyerHomePage() {
  const [lawyerName, setLawyerName] = useState("Lawyer");
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const fetchLawyerDataAndAppointments = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Get lawyer name
      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setLawyerName(data.name || "Lawyer");
      }

      // Get appointments for this lawyer
      const appointmentsRef = collection(db, "appointments");
      const appointmentsQuery = query(
        appointmentsRef,
        where("lawyerId", "==", user.uid),
        where("status", "in", ["pending", "approved"])
      );
      const snapshot = await getDocs(appointmentsQuery);

      // Filter only upcoming (today or later) appointments
      const today = new Date();
      const upcoming = snapshot.docs.filter((doc) => {
        const data = doc.data();
        const appointmentDate = new Date(data.date); // assuming date is in yyyy-mm-dd format
        return appointmentDate >= new Date(today.toDateString()); // removes time part
      });

      setAppointmentCount(upcoming.length);
    };

    fetchLawyerDataAndAppointments();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {lawyerName} 👋</h1>
          <p className="text-gray-600">Here’s your overview for today.</p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 gap-6">
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
