"use client";
import logoFooter from "../../../public/assets/logo-footer.png";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const router = usePathname();

  return (
    <div className="bg-black text-white py-[100px]">
      <div className="container">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-4 ">
            <Image className="" src={logoFooter} alt="" />
            <h1 className="lg:text-3xl lg:font-extrabold text-2xl font-bold">
              Law.BD
            </h1>
          </Link>
          <div className="py-8">
            <ul className="flex items-center justify-center px-5 gap-16">
              <li>
                <Link
                  href="/"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-white text-[18px] font-medium ${
                    router === "/" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Home
                </Link>
              </li>
             <li>
                <Link
                  href="/lawyers-profile"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-white text-[18px] font-medium ${
                    router === "/lawyers-profile" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Lawyers profile
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-white text-[18px] font-medium ${
                    router === "/blogs" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Booking form
                </Link>
              </li>
              <li>
                <Link
                  href="/contactUs"
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-white text-[18px] font-medium ${
                    router === "/contact-us" ? "after:w-full" : "after:w-0"
                  }`}
                >
                  Contact Us
                </Link>
              </li>
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
    </div>
  );
};

export default Footer;
