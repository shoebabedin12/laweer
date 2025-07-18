"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { FiLoader } from "react-icons/fi";
import Link from "next/link";
import { FormProps } from "@/types/FormTypes";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import logo from "../../public/assets/logo.png";

// ✅ Yup validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
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
        const { user } = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        // ✅ Get Firebase ID token
        const token = await user.getIdToken();

        // ✅ Server sets cookie, readable by middleware
        await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        // ✅ Get user document from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          toast.error("User profile not found!", { position: "top-right" });
          return;
        }

        const userData = userSnap.data();
        const role = userData?.role;

        toast.success("Logged in successfully!", { position: "top-right" });
        resetForm();

        // ✅ Redirect based on role
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "lawyer") {
          // Optional: check if profile is completed
          router.push("/lawyer");
        } else {
          router.push(redirectTo || "/users");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        toast.error(err.message, { position: "top-right" });
      }
    },
  });

  return (
    <>
     <header
          className={`w-full top-0 z-50 transition-all duration-300 ease-linear bg-white shadow-md`}
        >
          <div className="container">
            <div className="flex items-center justify-center py-6">
              <Link href="/" className="flex items-center gap-4">
                <Image src={logo} alt="" />
                <h1 className="lg:text-3xl lg:font-extrabold text-2xl font-plus_jakarta_sans font-bold text-(--color-text)">
                  Law.BD
                </h1>
              </Link>
            </div>
          </div>
        </header>
    <div className="my-[100px]">
      <div className="container">
        <div className="shadow-2xl max-w-[600px] mx-auto rounded-2xl py-5 px-8">
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-12 gap-4"
          >
            <div className="col-span-12 mb-4">
              <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600">{formik.errors.email}</div>
              )}
            </div>

            <div className="col-span-12 mb-4">
              <label className="block mb-2 font-medium text-base md:text-xl leading-6 text-(--color-text)/70">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  placeholder="Password"
                  type={passwordShow ? "text" : "password"}
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
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
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
                  "LOGIN"
                )}
              </button>
            </div>

            <div className="col-span-12 text-center mt-2">
              <p className="text-sm">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 underline hover:text-blue-800"
                >
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
