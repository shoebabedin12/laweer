import logoFooter from "../../../public/assets/logo-footer.png";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-black text-white px-[80px] py-[100px]">
      <div className="flex flex-col items-center">
        <Link href="/" className="flex items-center gap-4 ">
          <Image className="" src={logoFooter} alt="" />
          <h1 className="lg:text-3xl lg:font-extrabold text-2xl font-bold">
            Law.BD
          </h1>
        </Link>
        <div className="py-8">
          <ul className="menu menu-horizontal px-5 gap-16">
            <Link
              href="/"
              // className={({ isActive }) => (isActive ? "border-b-2 " : "")}
            >
              <li>Home</li>
            </Link>

            <Link
              href="/booking"
              // className={({ isActive }) =>
              //   isActive ? "border-b-2" : ""
              // }
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
              // className={({ isActive }) =>
              //   isActive ? "border-b-2" : ""
              // }
            >
              <li>Contact</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="border-b-1 border-dashed border-gray-500"></div>
      <div className="flex justify-center items-center gap-10 py-[32px]">
        <a href="" className="">
          <FaFacebook className="text-blue-500  rounded-full w-9 h-9" />
        </a>
        <a href="" className="">
          <BsTwitterX className=" text-white w-9 h-9" />
        </a>
        <a href="" className="">
          <FaLinkedin className=" text-blue-400 w-9 h-9" />
        </a>
        <a href="">
          <FaYoutubeSquare className=" text-red-500 w-9 h-9" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
