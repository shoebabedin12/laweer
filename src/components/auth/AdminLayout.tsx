'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (!user) {
        router.replace('/login'); // 🔁 match your actual login route
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
          setUnauthorized(true);
          router.replace('/admin');
          return;
        }

        const role = userDoc.data()?.role;

        if (role !== 'admin') {
          setUnauthorized(true);
          router.replace('/admin');
          return;
        }

        // ✅ All checks passed
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user role:', err);
        setUnauthorized(true);
        router.replace('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}
