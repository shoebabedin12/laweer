'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, lawyers: 0, appointments: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const usersSnap = await getDocs(collection(db, 'users'));
      const lawyerCount = usersSnap.docs.filter(doc => doc.data().role === 'lawyer').length;
      const userCount = usersSnap.docs.filter(doc => doc.data().role === 'user').length;

      const appointmentsSnap = await getDocs(collection(db, 'appointments')); // optional
      setStats({
        users: userCount,
        lawyers: lawyerCount,
        appointments: appointmentsSnap.size,
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Users" count={stats.users} color="bg-blue-100" />
        <DashboardCard title="Total Lawyers" count={stats.lawyers} color="bg-green-100" />
        <DashboardCard title="Appointments" count={stats.appointments} color="bg-yellow-100" />
      </div>
    </div>
  );
}

function DashboardCard({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <div className={`rounded-xl p-6 shadow-md ${color}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}
