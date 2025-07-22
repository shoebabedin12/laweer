"use client";

import { SidebarProps } from "@/types/DataTypes";
// import { logout } from "@/utility/logout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BsPower,
  BsFillPersonFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaUserTie } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = ({ showSideNav, role }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [, setIsMobile] = useState(false);
  const [, setSidebarHidden] = useState(false);

  const handleLogout = async () => {
    // await logout();
    router.push("/signin");
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 576;
      setIsMobile(isSmall);
      setSidebarHidden(isSmall);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = (() => {
    switch (role) {
      case "admin":
        return [
          {
            href: "/admin/dashboard",
            label: "Dashboard",
            icon: <MdDashboard />,
            key: "/admin/dashboard",
          },
          {
            href: "/admin/users",
            label: "Users",
            icon: <BsFillPeopleFill />,
            key: "/admin/users",
          },
        ];
      case "lawyer":
        return [
          {
            href: "/lawyer",
            label: "Home",
            icon: <MdDashboard />,
            key: "/lawyer",
          },
          {
            href: "/lawyer/appointments",
            label: "Appointments",
            icon: <MdDashboard />,
            key: "/lawyer/appointments",
          },
          {
            href: "/lawyer/profile",
            label: "My Profile",
            icon: <FaUserTie />,
            key: "/lawyer/profile",
          },
        ];
      case "user":
        return [
          {
            href: "/users",
            label: "Home",
            icon: <MdDashboard />,
            key: "/users",
          },
          {
            href: "/users/profile",
            label: "Profile",
            icon: <CgProfile />,
            key: "/users/profile",
          },
          {
            href: "/users/appointments",
            label: "Find Lawyers",
            icon: <BsFillPeopleFill />,
            key: "/users/appointments",
          },
        ];
      default:
        return [];
    }
  })();

  return (
    <section id="sidebar" className={showSideNav ? "show" : "hide"}>
      <a href="#" className="brand">
        <BsFillPersonFill
          size={28}
          style={{ minWidth: 60, display: "flex", justifyContent: "center" }}
        />
        <span className="text">AdminHub</span>
      </a>
      <ul className="side-menu top">
        {menuItems.map((item) => (
          <li key={item.key} className={pathname === item.key ? "active" : ""}>
            <Link href={item.href}>
              <i className="bx">{item.icon}</i>
              <span className="text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu bottom">
        {/* <li>
          <Link href="#">
            <BsGearFill size={18} />
            <span className="text">Settings</span>
          </Link>
        </li> */}
        <li>
          {/* Use button for logout action */}
          <button
            type="button"
            className="logout flex items-center gap-2"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <BsPower size={18} />
            <span className="text">Logout</span>
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
