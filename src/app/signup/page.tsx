'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { FiLoader } from "react-icons/fi";
import * as Yup from "yup";
import { FormProps, MessageState } from '@/types/FormTypes';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import {useRouter } from 'next/navigation';


// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
});

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState<MessageState>(null);
  const [passwordShow, setPasswordShow] = useState(false);

  const formik = useFormik<FormProps>({
    initialValues: {
      name: '',
      email: '',
      role: 'admin',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      setMessage(null);
      try {
        const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password);
        await updateProfile(user, { displayName: values.name });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: values.name,
          email: values.email,
          role: values.role,
          createdAt: new Date(),
        });

        toast.success('Account created successfully!', { position: 'top-center' });
        resetForm();
        router.push('/signin');
      } catch (err: any) {
        setMessage({ type: 'error', text: err.message });
      }
    },
  });

  return (
    <>
      <div className="my-[100px]">
        <div className="container">
          <div className="shadow-2xl max-w-[600px] mx-auto rounded-2xl py-5 px-8">
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 mb-4">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
              </div>
              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>

               <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-(--color-text)/70 placeholder-gray-400 p-3 rounded-md border border-(--color-text)/70 focus:outline-none mb-1"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">

                  <input
                    type={passwordShow ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full p-2 border rounded"
                  />
                  <div
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300"
                  >
                    {passwordShow ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>
              <div className="col-span-12">
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="w-full bg-(--color-primary) text-white font-bold text-base leading-[22px] py-[17px] rounded-[65px] text-center flex items-center justify-center cursor-pointer"
                >
                  {formik.isSubmitting ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    "SUBMIT"
                  )}
                </button>
              </div>
              <div className="col-span-12">
                <p className="mt-4 text-sm text-center">
                  Already have an account?{' '}
                  <Link href="/signin" className="w-full bg-(--color-primary) text-white font-bold text-base leading-[22px] py-[17px] rounded-[65px] text-center flex items-center justify-center cursor-pointer mt-2">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
