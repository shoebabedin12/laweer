"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Sidebar from "../adminLayout/Sidebar";
import "./admin.css";
import Navbar from "../adminLayout/Navbar";
import { UserProvider } from "@/context/UserContext";

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
        setRole(userRole);
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
    <UserProvider>
      <Sidebar showSideNav={showSideNav} role={role}/>
      <section id="content">
        <Navbar showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
        <main>{children}</main>
      </section>
    </UserProvider>
  );
}
