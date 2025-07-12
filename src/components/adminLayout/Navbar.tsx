"use client";
import { BsMoon, BsSun, BsBellFill } from "react-icons/bs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi";
import { SidebarProps } from "@/types/DataTypes";

const Navbar = ({showSideNav, setShowSideNav}: SidebarProps) => {
 const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("dark", !darkMode);
  };

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

  return (
    <nav>
      <FiMenu onClick={()=> setShowSideNav(!showSideNav)}/>
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
        <span className="num">8</span>
      </a>
      <div
        className={`notification-menu ${showNotification ? "show" : ""}`}
        id="notificationMenu"
      >
        <ul>
          <li>New message from John</li>
          <li>Your order has been shipped</li>
          <li>New comment on your post</li>
          <li>Update available for your app</li>
          <li>Reminder: Meeting at 3PM</li>
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
          <li>
            <a href="#">My Profile</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
