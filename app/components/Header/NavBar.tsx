'use client';

import { navbar } from '@/app/data/navbar-data';
import logo from '@/public/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { unstable_ViewTransition as ViewTransition } from 'react';

const NavBar = () => {
  const router = usePathname();
  const [scrollPosition, setPosition] = useState({ scrollY: 0 });
  const [menuShow, setMenuShow] = useState(false);

  const toggleMenu = () => {
    setMenuShow(prev => !prev);
  };

  const offCanvasMenu = () => {
    setMenuShow(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const updatePosition = () => {
      setPosition({ scrollY: window.scrollY });
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return (
    <>
      <header
        className={`top-0 z-50 w-full transition-all duration-300 ease-linear ${
          scrollPosition.scrollY > 200
            ? 'animate-slide-down fixed bg-white shadow-2xl'
            : 'absolute top-0 right-0 left-0 w-full'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between py-6">
            <ViewTransition name="header-image" className="via-blur">
              <Link href="/" className="flex items-center gap-1 md:gap-4">
                <Image src={logo} alt="Law.BD Logo" className="h-6 w-6" />
                <h1 className="font-plus_jakarta_sans text-lg font-bold text-[var(--color-text)] lg:text-3xl lg:font-extrabold">
                  Law.BD
                </h1>
              </Link>
            </ViewTransition>
            <div className="hidden lg:block">
              <ul className="flex items-center justify-between gap-5 px-5">
                {navbar.map(item => (
                  <li key={item.id}>
                    <ViewTransition name="header-title" className="via-blur">
                      <Link
                        href={item.link}
                        className={`relative inline-block text-[18px] font-medium text-[var(--color-text)]/70 after:block after:h-[2px] after:bg-[var(--color-primary)] after:transition-[width] after:duration-300 after:content-[''] hover:after:w-full ${
                          router === item.link ? 'after:w-full' : 'after:w-0'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </ViewTransition>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-end gap-4">
              {/* {status === "authenticated" ? ( */}
              {/* <div className="flex items-center gap-4"> */}
              {/* <span className="text-[var(--color-text)] text-sm lg:text-[18px]">
                    {session?.user?.name || "User"} (
                    {session?.user?.role || "Unknown"})
                  </span> */}
              {/* <button
                    onClick={() => signOut({ callbackUrl: "/signin" })}
                    className="btn rounded-full font-bold bg-[#0EA106] text-white py-2 lg:py-[15px] px-2 lg:px-[30px] text-sm lg:text-[18px]"
                  >
                    Logout
                  </button>
                </div> */}
              {/* ) : ( */}
              <span className="btn rounded-full bg-[#0EA106] px-2 py-2 text-sm font-bold text-white lg:px-[30px] lg:py-[15px] lg:text-[18px]">
                <ViewTransition
                  name="header-nav"
                  // only blur when unmounted:
                  // - navs between `/` and `(with-nav)/*`
                  // - but not (with-nav)/* <-> (with-nav)/*
                  share="via-blur"
                >
                  <Link
                    href="/signup"
                    className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 after:content-[''] hover:after:w-full"
                  >
                    Register
                  </Link>{' '}
                  |{' '}
                </ViewTransition>
                <ViewTransition
                  name="header-nav"
                  // only blur when unmounted:
                  // - navs between `/` and `(with-nav)/*`
                  // - but not (with-nav)/* <-> (with-nav)/*
                  share="via-blur"
                >
                  <Link
                    href="/signin"
                    className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 after:content-[''] hover:after:w-full"
                  >
                    Login
                  </Link>
                </ViewTransition>
              </span>
              {/* )} */}
              <div className="hamburger block lg:hidden">
                <RxHamburgerMenu
                  className="cursor-pointer text-[30px] text-[var(--color-primary)]"
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
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed top-0 right-0 z-50 h-full min-h-screen w-full origin-right overflow-y-auto bg-white/80 px-4 py-6 backdrop-blur-[31px]"
      >
        <button
          onClick={offCanvasMenu}
          className="absolute top-4 right-4 rounded-md bg-gray-700 p-2 text-white"
        >
          <IoMdClose
            className="cursor-pointer text-[30px] text-white"
            aria-expanded={menuShow}
          />
        </button>
        <ul className="mt-12 flex flex-col items-center justify-center space-y-4">
          {navbar.map(item => (
            <li key={item.id}>
              <Link
                href={item.link}
                onClick={offCanvasMenu}
                className={`relative inline-block text-[18px] font-medium text-[var(--color-text)]/70 after:block after:h-[2px] after:bg-[var(--color-primary)] after:transition-[width] after:duration-300 after:content-[''] hover:after:w-full ${
                  router === item.link ? 'after:w-full' : 'after:w-0'
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
          {/* {status === "authenticated" ? (
            <li>
              <button
                onClick={() => signOut({ callbackUrl: "/signin" })}
                className="text-[var(--color-text)]/70 text-[18px] font-medium"
              >
                Logout
              </button>
            </li>
          ) : ( */}
          <>
            <li>
              <Link
                href="/signup"
                onClick={offCanvasMenu}
                className="text-[18px] font-medium text-[var(--color-text)]/70"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                href="/signin"
                onClick={offCanvasMenu}
                className="text-[18px] font-medium text-[var(--color-text)]/70"
              >
                Login
              </Link>
            </li>
          </>
          {/* )} */}
        </ul>
      </motion.div>
    </>
  );
};

export default NavBar;
