/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BsBellFill } from "react-icons/bs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { SidebarProps } from "@/types/DataTypes";
import { logout } from "@/utility/logout";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";

const Navbar = ({ showSideNav, setShowSideNav }: SidebarProps) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoleAndNotifications = async () => {
      if (!user) return;

      // ✅ Get user role from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : null;
      const currentRole = userData?.role || null;
      setRole(currentRole);

      // ✅ Only for user & lawyer fetch notifications
      if (currentRole === "user" || currentRole === "lawyer") {
        const q = query(
          collection(db, "appointments"),
          where(currentRole === "user" ? "userId" : "lawyerId", "==", user.uid)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map(
            (doc) =>
              ({ id: doc.id, ...doc.data() } as {
                id: string;
                status: string;
                date: string;
                time: string;
              })
          )
          .filter(
            (item) => item.status === "approved" || item.status === "rejected"
          );

        setNotifications(data);
      }
    };

    fetchRoleAndNotifications();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".notification")) {
        setShowNotification(false);
      }
      if (!target.closest(".profile")) {
        setShowProfile(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/signin");
  };

  console.log(notifications);

  return (
    <nav>
      <FiMenu
        onClick={() => {
          if (setShowSideNav) {
            setShowSideNav(!showSideNav);
          }
        }}
        className="cursor-pointer"
      />
      <form action="#">
        <div className="form-input">
          {/* <input type="search" placeholder="Search..." /> */}
          {/* <button type="submit" className="search-btn">
            <CiSearch />
          </button> */}
        </div>
      </form>

      {/* <input
        type="checkbox"
        className="checkbox"
        id="switch-mode"
        hidden
        checked={darkMode}
        onChange={toggleDarkMode}
      /> */}
      {/* <label className="swith-lm" htmlFor="switch-mode">
        <BsMoon className="bxs-moon" />
        <BsSun className="bx-sun" />
        <div className="ball"></div>
      </label> */}

      {(role === "user" || role === "lawyer") && (
        <>
          <a
            href="#"
            className="notification"
            onClick={(e) => {
              e.preventDefault();
              setShowNotification((prev) => !prev);
              setShowProfile(false);
            }}
          >
            <BsBellFill className="bx bxs-bell bx-tada-hover" />
            {notifications.length > 0 && (
              <span className="num">{notifications.length}</span>
            )}
          </a>

          <div
            className={`notification-menu ${showNotification ? "show" : ""}`}
            id="notificationMenu"
          >
            <ul>
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((note) => (
                  <li key={note.id} className="text-sm">
                    Appointment on <b>{note.date}</b> at <b>{note.time}</b> was{" "}
                    <span
                      className={
                        note.status === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {note.status}
                    </span>
                    .
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">No new notifications</li>
              )}
            </ul>
          </div>
        </>
      )}

      <div
        className={`notification-menu ${showNotification ? "show" : ""}`}
        id="notificationMenu"
      >
        <ul>
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <li key={note.id} className="text-sm">
                Appointment on <b>{note.date}</b> at <b>{note.time}</b> was{" "}
                <span
                  className={
                    note.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {note.status}
                </span>
                .
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No new notifications</li>
          )}
        </ul>
      </div>

      <a
        href="#"
        className="profile"
        onClick={(e) => {
          e.preventDefault();
          setShowProfile((prev) => !prev);
          setShowNotification(false);
        }}
      >
        <Image
          src={user?.photoURL || "https://placehold.co/600x400/png"}
          alt="Profile"
          width={36}
          height={36}
        />
      </a>
      <div
        className={`profile-menu ${showProfile ? "show" : ""}`}
        id="profileMenu"
      >
        <ul>
          {role !== "admin" && (
            <li>
              <Link
                href={`${
                  role === "lawyer" ? "lawyer/profile" : "users/profile"
                }`}
              >
                My Profile
              </Link>
            </li>
          )}
          <li>
            <Link
              href=""
              type="button"
              className="logout text-red-600"
              onClick={handleLogout}
            >
              <span className="text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
