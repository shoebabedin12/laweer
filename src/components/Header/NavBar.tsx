"use client";
import { navbar } from "@/data/navbar-data";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from 'react-icons/rx';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';

const NavBar = () => {
  const router = usePathname();
  const [scrollPosition, setPosition] = useState({ scrollY: 0 });
  const [menuShow, setMenuShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [canvasShow, setCanvasShow] = useState(false);

  const toggleMenu = () => {
    setMenuShow(prev => !prev);
  };

const offCanvasMenu = () => {
  setMenuShow(false); // Close the motion div
  document.body.style.overflow = ''; // Restore scroll
};

  useEffect(() => {
    const updatePosition = () => {
      setPosition({ scrollY: window.scrollY });
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <>
      <header
        className={`w-full top-0 z-50 transition-all duration-300 ease-linear ${scrollPosition.scrollY > 200
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
            <div className="hidden lg:block">
              <ul className="flex items-center justify-between gap-5 px-5">
                {navbar.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium ${router === item.link ? "after:w-full" : "after:w-0"
                        }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-end gap-4">
              <span
                className="btn rounded-full font-bold bg-[#0EA106] text-white py-2 lg:py-[15px] px-2 lg:px-[30px] text-sm lg:text-[18px]"
              >
                <Link href={'/signup'} className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full after:w-0">Register</Link> | <Link href={'/signin'} className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:transition-[width] after:duration-300 hover:after:w-full after:w-0">Login</Link>
              </span>
              <div className="hamburgur block lg:hidden">
                <RxHamburgerMenu
                  className="text-[30px] text-primary cursor-pointer"
                  onClick={toggleMenu}
                  aria-expanded={menuShow}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <motion.div 
      initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: menuShow ? 1 : 0, opacity: menuShow ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }} className="fixed top-0 right-0 z-50 w-full h-full min-h-screen py-6 px-4 overflow-y-auto backdrop-blur-[31px] bg-white/80 origin-right">
        <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded-md"
            >
              <IoMdClose className="text-[30px] text-white cursor-pointer" onClick={offCanvasMenu} aria-expanded={menuShow} />
            </button>
        <ul className="mt-12 space-y-4 flex flex-col items-center justify-center">
          {navbar.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium ${router === item.link ? "after:w-full" : "after:w-0"
                  }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
};

export default NavBar;
