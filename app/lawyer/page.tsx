"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaCalendarCheck, FaComments } from "react-icons/fa";
import Link from "next/link";

export default function LawyerHomePage() {
  const [lawyerName, setLawyerName] = useState("Lawyer");

  useEffect(() => {
    const fetchLawyerData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setLawyerName(data.name || "Lawyer");
      }
    };

    fetchLawyerData();
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard
            title="Upcoming Appointments"
            icon={<FaCalendarCheck className="text-blue-600" size={32} />}
            count={'4'} 
            description="View and manage your upcoming schedules."
            href="/lawyer/appointments"
          />
          <ActionCard
            title="Messages"
            icon={<FaComments className="text-purple-600" size={32} />}
            count={'12'}
            description="Check and respond to client messages."
            href="/lawyer/messages"
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
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-3xl font-bold mt-2">{count}</p>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
