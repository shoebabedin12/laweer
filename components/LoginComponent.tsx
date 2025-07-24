/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";
import { FormProps } from "@/types/FormTypes";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logo from "../public/assets/logo.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
});

export default function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  const [passwordShow, setPasswordShow] = useState(false);

  const formik = useFormik<FormProps>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post<{ token: string }>(`${process.env.NEXT_PUBLIC_APP_API_KEY}/auth/login`, {
          email: values.email,
          password: values.password,
        });

        const { token } = response.data;

        // ✅ Decode the token to get user role
        const decoded: any = jwtDecode(token);
        const role = decoded.user?.role;        

        // ✅ Store token in localStorage
        localStorage.setItem("token", token);

        toast.success("Logged in successfully!", { position: "top-right" });
        resetForm();

        // ✅ Redirect based on role
        if (role === "admin") {
          console.log(role);
          router.push("/admin");
        } else if (role === "lawyer") {
          console.log(role);
          router.push("/lawyer");
        } else {
          console.log(role);
          router.push(redirectTo || "/users");
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Login failed", { position: "top-right" });
      }
    },
  });

  return (
    <>
      <header className="w-full top-0 z-50 bg-white shadow-md">
        <div className="container">
          <div className="flex items-center justify-center py-6">
            <Link href="/" className="flex items-center gap-4">
              <Image src={logo} alt="Logo" />
              <h1 className="lg:text-3xl font-bold text-2xl text-gray-900">Law.BD</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="my-[100px]">
        <div className="container">
          <div className="shadow-2xl max-w-[600px] mx-auto rounded-2xl py-5 px-8">
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
              <div className="col-span-12 mb-4 text-center">
                <h2 className="text-2xl font-bold">Login</h2>
              </div>

              {/* Email Field */}
              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium">Email <span className="text-red-500">*</span></label>
                <input
                  name="email"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Enter your email"
                  className="w-full border rounded p-3"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-600">{formik.errors.email}</div>
                )}
              </div>

              {/* Password Field */}
              <div className="col-span-12 mb-4">
                <label className="block mb-2 font-medium">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    name="password"
                    placeholder="Password"
                    type={passwordShow ? "text" : "password"}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="w-full border rounded p-3"
                  />
                  <div
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer"
                  >
                    {passwordShow ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
                )}
              </div>

              {/* Submit */}
              <div className="col-span-12">
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded font-bold"
                >
                  {formik.isSubmitting ? <FiLoader className="animate-spin" /> : "LOGIN"}
                </button>
              </div>

              <div className="col-span-12 text-center mt-2">
                <p className="text-sm">
                  Don’t have an account?{" "}
                  <Link href="/signup" className="text-blue-600 underline">
                    Sign up
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
