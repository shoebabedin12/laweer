'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Zod স্কিমা
const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'নাম কমপক্ষে ২ অক্ষরের হতে হবে' })
    .trim(),
  email: z.string().email({ message: 'সঠিক ইমেইল প্রদান করুন' }).trim(),
  password: z
    .string()
    .min(8, { message: 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে' })
    .regex(/[a-zA-Z]/, { message: 'কমপক্ষে একটি অক্ষর থাকতে হবে' })
    .regex(/[0-9]/, { message: 'কমপক্ষে একটি সংখ্যা থাকতে হবে' })
    .regex(/[^a-zA-Z0-9]/, { message: 'কমপক্ষে একটি বিশেষ অক্ষর থাকতে হবে' })
    .trim(),
  role: z.enum(['user', 'lawyer'], { message: 'ভূমিকা নির্বাচন করুন' }),
  specialization: z.string().optional(),
  experience: z.string().optional(),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function ClientSignupForm() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'user',
    },
  });

  const role = watch('role'); // role ফিল্ড মনিটর করা

  const onSubmit = async (data: SignupForm) => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          experience: data.experience ? parseInt(data.experience) : undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message);
        setTimeout(() => router.push('/signin'), 2000);
      } else {
        setError(result.message || 'সাইনআপ ব্যর্থ হয়েছে');
      }
    } catch (err) {
      setError('কিছু ভুল হয়েছে, আবার চেষ্টা করুন');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          নাম
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
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
      <div className="mb-4">
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
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          ভূমিকা
        </label>
        <select
          id="role"
          {...register('role')}
          className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user">ইউজার</option>
          <option value="lawyer">আইনজীবী</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>
      {role === 'lawyer' && (
        <>
          <div className="mb-4">
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              বিশেষত্ব
            </label>
            <input
              type="text"
              id="specialization"
              {...register('specialization')}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.specialization && (
              <p className="text-red-500 text-sm">{errors.specialization.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
              অভিজ্ঞতা (বছর)
            </label>
            <input
              type="number"
              id="experience"
              {...register('experience')}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
          </div>
        </>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? 'সাইনআপ হচ্ছে...' : 'সাইনআপ'}
      </button>
    </form>
  );
}