// app/signup/page.tsx or a client component
'use client';

import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignupPage() {
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, 'user@example.com', 'password123');
      alert('User signed up!');
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleSignup}>Sign Up</button>;
}
