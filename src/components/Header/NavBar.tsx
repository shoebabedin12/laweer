"use client";
import { navbar } from "@/data/navbar-data";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NavBar = () => {
  const router = usePathname();
  const [scrollPosition, setPosition] = useState({ scrollY: 0 });

  useEffect(() => {
    const updatePosition = () => {
      setPosition({ scrollY: window.scrollY });
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <header
      className={`w-full top-0 z-50 transition-all duration-300 ease-linear ${
        scrollPosition.scrollY > 200
          ? "fixed animate-slide-down bg-white shadow-2xl"
          : "absolute top-0 left-0 w-full right-0"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-4">
            <Image src={logo} alt="" />
            <h1 className="lg:text-3xl lg:font-extrabold text-2xl font-plus_jakarta_sans font-bold text-(--color-text)">
              Law.BD
            </h1>
          </Link>
          <div className="hidden md:block">
            <ul className="flex items-center justify-between gap-5 px-5">
              {navbar.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium ${
                      router === item.link ? "after:w-full" : "after:w-0"
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {/* <li>
                <Link
                  href="/"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium ${
                    router === "/" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/lawyers-profile"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium ${
                    router === "/lawyers-profile" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Lawyers profile
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium ${
                    router === "/blogs" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Booking form
                </Link>
              </li>
              <li>
                <Link
                  href="/contactUs"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium ${
                    router === "/contact-us" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Contact Us
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="">
            <span
              className="btn rounded-full font-bold bg-[#0EA106] text-white py-[15px] px-[30px] text-[18px]"
            >
              <Link href={'/signup'} className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full after:w-0">Register</Link> | <Link href={'/signin'} className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full after:w-0">Login</Link>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
