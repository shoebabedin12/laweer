"use client";

import { SidebarProps } from "@/types/DataTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPower, BsFillPersonFill, BsGearFill, BsFillPeopleFill } from "react-icons/bs";

const Sidebar = ({showSideNav}: SidebarProps) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
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

    const menuItems = [
    { href: "/admin/user", label: "Users", icon: <BsFillPeopleFill />, key: "users" },
  ];
  return (
      <section id="sidebar" className={showSideNav ? 'hide' : "show"}>
      <a href="#" className="brand">
        <BsFillPersonFill size={28} style={{ minWidth: 60, display: 'flex', justifyContent: 'center' }} />
        <span className="text">AdminHub</span>
      </a>
      <ul className="side-menu top">
         {menuItems.map((item) => (
          <li
            key={item.key}
            className={pathname.includes(item.key) ? "active" : ""}
          >
            <Link href={item.href}>
              <i className="bx">{item.icon}</i>
              <span className="text">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu bottom">
        <li>
          <Link href="#">
            <BsGearFill size={18} />
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <a href="#" className="logout">
            <BsPower size={18} />
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
