'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Zod স্কিমা
const loginSchema = z.object({
  email: z.string().email('ইমেইল সঠিক নয়').min(1, 'ইমেইল প্রয়োজন'),
  password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function ClientLoginForm() {
  const [error, setError] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError('');
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false, // রিডিরেক্ট বন্ধ, আমরা ম্যানুয়ালি হ্যান্ডেল করব
      });

      if (result?.error) {
        setError('লগইন ব্যর্থ: ইমেইল বা পাসওয়ার্ড সঠিক নয়');
      }
    } catch (err) {
      setError('কিছু ভুল হয়েছে, আবার চেষ্টা করুন');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          ইমেইল
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          পাসওয়ার্ড
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? 'লগইন হচ্ছে...' : 'লগইন'}
      </button>
    </form>
  );
}