'use client';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { signIn, useSession } from 'next-auth/react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { FcGoogle } from 'react-icons/fc';

// const loginSchema = z.object({
//   email: z.string().email('ইমেইল সঠিক নয়').min(1, 'ইমেইল প্রয়োজন'),
//   password: z.string().min(6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'),
// });

// type LoginForm = z.infer<typeof loginSchema>;

export default function ClientLoginForm() {
  // const [error, setError] = useState<string>('');
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const { data: session, status } = useSession();


  // useEffect(() => {
  //   if (session?.user) {
  //     router.push('/');
  //   }
  // }, [session, router]);

  // Google error catch
  // useEffect(() => {
  //   const err = searchParams.get('error');
  //   if (err === 'AccessDenied') {
  //     setError('Google লগইন ব্যর্থ: অনুমতি প্রত্যাখ্যান করা হয়েছে');
  //   } else if (err === 'OAuthSignin') {
  //     setError('Google লগইন ব্যর্থ হয়েছে');
  //   }
  // }, [searchParams]);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<LoginForm>({
  //   resolver: zodResolver(loginSchema),
  // });

  // const onSubmit = async (data: LoginForm) => {
  //   setError('');
  //   try {
  //     const result = await signIn('credentials', {
  //       email: data.email,
  //       password: data.password,
  //       redirect: false, // NextAuth এ আমরা ম্যানুয়ালি রাউট করব
  //     });

  //     if (result?.error) {
  //       setError('লগইন ব্যর্থ: ইমেইল বা পাসওয়ার্ড সঠিক নয়');
  //     } else {
  //       router.push('/'); // লগইন সফল হলে হোমপেজ বা ড্যাশবোর্ডে পাঠানো হবে
  //     }
  //   } catch (err) {
  //     setError('কিছু ভুল হয়েছে, আবার চেষ্টা করুন');
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   setError('');
  //   try {
  //     await signIn('google', { callbackUrl: '/' });
  //   } catch (err) {
  //     setError('Google লগইন ব্যর্থ হয়েছে, আবার চেষ্টা করুন');
  //   }
  // };

  return (
    <>
    {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div className="flex items-center justify-center my-4">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="mx-4 text-gray-500">অথবা</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 p-2 rounded hover:bg-gray-100 disabled:bg-gray-200"
      >
        <FcGoogle size={24} />
        Google দিয়ে লগইন করুন
      </button>
    </form> */}
    </>
  );
}
