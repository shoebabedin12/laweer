"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Sidebar from "../adminLayout/Sidebar";
import Link from "next/link";
import "./admin.css";
import Image from "next/image";
import { IoIosMenu } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import Navbar from "../adminLayout/Navbar";

export default function RoleProtectedLayout({
  children,
  allowedRole,
  redirectTo = "/signin",
}: {
  children: React.ReactNode;
  allowedRole: "admin" | "lawyer" | "user";
  redirectTo?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace(redirectTo);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(docRef);

        if (!userSnap.exists()) {
          router.replace(redirectTo);
          return;
        }

        const userRole = userSnap.data()?.role;
        if (userRole !== allowedRole) {
          router.replace(redirectTo);
          return;
        }

        setLoading(false); // ✅ Passed check
      } catch (error) {
        console.error("Role check failed", error);
        router.replace(redirectTo);
      }
    });

    return () => unsubscribe();
  }, [allowedRole, redirectTo, router]);
 

  if (loading) return null; // or show spinner

  return (
    <>
      <Sidebar showSideNav={showSideNav}/>
      <section id="content">
        <Navbar showSideNav={showSideNav} setShowSideNav={setShowSideNav}/>
        <main>{children}</main>
      </section>
    </>
  );
}
