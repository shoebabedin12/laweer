'use server';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ClientLoginForm from '@/components/LoginComponent';

// SSR: সেশন চেক করুন
export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    const role = session.user?.role;
    if (role === 'admin') {
      redirect('/admin');
    } else if (role === 'lawyer') {
      redirect('/lawyer');
    } else {
      redirect('/users');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">লগইন</h1>
        <ClientLoginForm />
      </div>
    </div>
  );
}