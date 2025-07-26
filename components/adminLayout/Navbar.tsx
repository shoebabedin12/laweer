/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BsBellFill } from "react-icons/bs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { SidebarProps } from "@/types/DataTypes";
// import { logout } from "@/utility/logout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {jwtDecode} from "jwt-decode";

const Navbar = ({ showSideNav, setShowSideNav }: SidebarProps) => {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded: any = jwtDecode(token);
    const currentRole = decoded?.user?.role || null;
    setRole(currentRole);

    // You can fetch notifications from your backend if needed
    // For now, we mock them as empty
    setNotifications([]);
  }, []);

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
    // await logout();
    router.push("/signin");
  };

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

      <form action="" className="invisible"></form>

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
                    Appointment on <b>{note.date}</b> at <b>{note.time}</b> was {" "}
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
          src="https://placehold.co/600x400/png"
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
                href={`/${role === "lawyer" ? "lawyer/profile" : "users/profile"}`}
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
