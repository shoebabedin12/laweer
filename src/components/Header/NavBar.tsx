import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>My-Bookings</a>
            </li>
            <li>
              <a>Blogs</a>
            </li>
            <li>
              <a>Contact Us</a>
            </li>
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-4 ">
          <Image src={logo} alt="" />
          <h1 className="lg:text-3xl lg:font-extrabold text-2xl font-bold">
            Law.BD
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-5">
          <Link
            href="/"
            // className={({ isActive }) => (isActive ? "border-b-2 " : "")}
          >
            <li>Home</li>
          </Link>

          <Link
            href="/booking"
            // className={({ isActive }) => (isActive ? "border-b-2 mx-10" : "mx-10")}
          >
            <li>My-Bookings</li>
          </Link>

          <Link
            href="/blogs"
            // className={({ isActive }) => (isActive ? "border-b-2" : "")}
          >
            <li>Blogs</li>
          </Link>

          <Link
            href="/contactUs"
            // className={({ isActive }) => (isActive ? "border-b-2 mx-10" : "mx-10")}
          >
            <li>Contact</li>
          </Link>
        </ul>
      </div>
      <div className="navbar-end ">
        <Link href={'/'} className="btn rounded-full font-bold bg-[#0EA106] text-white py-[22px] px-[30px] text-[18px]">
          Contact Now
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
