'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUsers } from '@/lib/firestore';

interface CustomSession {
  user?: { role?: string };
}

interface User {
  id: string;
  email: string;
  role: string;
}

export default function UserManagement() {
  const { data: session, status } = useSession() as { data: CustomSession | null, status: string };
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/unauthorized');
    } else if (status === 'authenticated') {
      getUsers().then(setUsers).catch(console.error);
    }
  }, [status, session, router]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session || session.user?.role !== 'admin') return null;

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}