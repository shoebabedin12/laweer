/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.png";
import axios from "axios";

// ✅ Types
interface FormProps {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
}

interface MessageState {
  type: "error" | "success";
  text: string;
}

// ✅ Validation Schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(2),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
  confirm_password: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export default function SignupPage() {
  const router = useRouter();
  const [message, setMessage] = useState<MessageState | null>(null);
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const formik = useFormik<FormProps>({
    initialValues: {
      name: "",
      email: "",
      role: "admin",
      password: "",
      confirm_password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      setMessage(null);
      try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_KEY}/auth/signup`, {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        });

        setMessage({ type: "success", text: res.data.message || "Check your email to verify" });
        resetForm();
        router.push("/signin");
      } catch (err: any) {
        setMessage({
          type: "error",
          text: err?.response?.data?.message || "Registration failed",
        });
      }
    },
  });

  return (
    <>
      <header className="w-full top-0 z-50 bg-white shadow-md">
        <div className="container">
          <div className="flex items-center justify-center py-6">
            <Link href="/" className="flex items-center gap-4">
              <Image src={logo} alt="Law.BD logo" />
              <h1 className="lg:text-3xl font-bold text-2xl text-gray-800">Law.BD</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="my-[100px]">
        <div className="container">
          <div className="shadow-2xl max-w-[600px] mx-auto rounded-2xl py-5 px-8">
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 mb-4">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
              </div>

              {message && (
                <div
                  className={`col-span-12 text-center font-medium mb-4 ${
                    message.type === "error" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium">Select Role</label>
                <div className="flex gap-4">
                  {["user", "lawyer"].map((roleOption) => {
                    const isActive = formik.values.role === roleOption;
                    return (
                      <label
                        key={roleOption}
                        className={`cursor-pointer flex-1 text-center p-4 rounded-2xl border font-semibold ${
                          isActive
                            ? "border-blue-500 bg-blue-100 text-blue-700"
                            : "border-gray-300 bg-white text-gray-700"
                        }`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={roleOption}
                          checked={isActive}
                          onChange={formik.handleChange}
                          className="hidden"
                        />
                        {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full p-3 border rounded"
                  placeholder="Your Name"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-600 text-sm">{formik.errors.name}</div>
                )}
              </div>

              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full p-3 border rounded"
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600 text-sm">{formik.errors.email}</div>
                )}
              </div>

              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full p-3 border rounded"
                    placeholder="Password"
                  />
                  <div
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute right-4 top-3 cursor-pointer"
                  >
                    {passwordShow ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm">{formik.errors.password}</div>
                )}
              </div>

              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium">Confirm Password</label>
                <div className="relative">
                  <input
                    type={confirmPasswordShow ? "text" : "password"}
                    name="confirm_password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                    className="w-full p-3 border rounded"
                    placeholder="Confirm Password"
                  />
                  <div
                    onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                    className="absolute right-4 top-3 cursor-pointer"
                  >
                    {confirmPasswordShow ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
                {formik.touched.confirm_password && formik.errors.confirm_password && (
                  <div className="text-red-600 text-sm">{formik.errors.confirm_password}</div>
                )}
              </div>

              <div className="col-span-12">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full flex justify-center"
                >
                  {formik.isSubmitting ? <FiLoader className="animate-spin" /> : "SUBMIT"}
                </button>
              </div>

              <div className="col-span-12 text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link href="/signin" className="text-blue-600 underline hover:text-blue-800">
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
