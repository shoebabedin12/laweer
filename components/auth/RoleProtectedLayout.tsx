"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../adminLayout/Sidebar";
import Navbar from "../adminLayout/Navbar";
import { UserProvider } from "@/context/UserContext";
import Cookies from "js-cookie";
import "./admin.css";

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
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        // if (!token) {
        //   router.replace(redirectTo);
        //   return;
        // }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          router.replace(redirectTo);
          return;
        }

        const data = await res.json();

        if (data?.role !== allowedRole) {
          router.replace(redirectTo);
          return;
        }

        setRole(data.role);
        setLoading(false);
      } catch (error) {
        console.error("Authorization check failed:", error);
        router.replace(redirectTo);
      }
    };

    checkAuth();
  }, [allowedRole, redirectTo, router]);

  if (loading) return null; // or <Spinner />

  return (
    <UserProvider>
      <Sidebar showSideNav={showSideNav} role={role} />
      <section id="content">
        <Navbar showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
        <main>{children}</main>
      </section>
    </UserProvider>
  );
}
