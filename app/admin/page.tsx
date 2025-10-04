'use client';
// import { useEffect, useState } from 'react';
// import { MdEventAvailable } from 'react-icons/md';
// import { BsFillPeopleFill } from 'react-icons/bs';
// import { FaGavel } from 'react-icons/fa';

// type Stats = {
//   users: number;
//   lawyers: number;
//   appointments: number;
// };

export default function AdminDashboardPage() {
  // const [stats, setStats] = useState<Stats>({ users: 0, lawyers: 0, appointments: 0 });

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await fetch('/api/admin/stats'); // Make sure your backend provides this route
  //       const data = await res.json();

  //       setStats({
  //         users: data.totalUsers || 0,
  //         lawyers: data.totalLawyers || 0,
  //         appointments: data.totalAppointments || 0,
  //       });
  //     } catch (error) {
  //       console.error('Error fetching stats:', error);
  //     }
  //   };

  //   fetchStats();
  // }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 box-info">
        {/* <DashboardCard title="Total Users" count={stats.users} icon={<BsFillPeopleFill />} />
        <DashboardCard title="Total Lawyers" count={stats.lawyers} icon={<FaGavel />} />
        <DashboardCard title="Appointments" count={stats.appointments} icon={<MdEventAvailable />} /> */}
      </div>
    </div>
  );
}

// function DashboardCard({ title, count, icon }: { title: string; count: number; icon: React.ReactNode; }) {
//   return (
//     <div className="box-card p-6 bg-white shadow rounded text-center">
//       <div className="text-4xl mb-2">{icon}</div>
//       <h2 className="text-xl font-semibold mb-1">{title}</h2>
//       <p className="text-3xl font-bold">{count}</p>
//     </div>
//   );
// }
