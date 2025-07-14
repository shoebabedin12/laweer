"use client";
import logoFooter from "../../public/assets/logo-footer.png";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navbar } from "@/data/navbar-data";

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
            <ul className="flex items-center justify-center px-5 gap-4 md:gap-16">
              {navbar.map((item) => (<li key={item.id}>
                <Link
                  href={item.link}
                  className={`relative inline-block after:block after:content-[''] after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-white text-sm md:text-[18px] font-medium ${
                    router === item.link ? "after:w-full" : "after:w-0"
                  }`}
                >
                  {item.title}
                </Link>
              </li>))}
            </ul>
          </div>
        </div>
        <div className="border-b-1 border-dashed border-gray-500"></div>
        <div className="flex justify-center items-center gap-10 py-4 md:py-8">
          <Link href="#">
            <FaFacebook className="text-blue-500  rounded-full w-5 md:w-9 h-5 md:h-9" />
          </Link>
          <Link href="#">
            <BsTwitterX className=" text-white w-5 md:w-9 h-5 md:h-9" />
          </Link>
          <Link href="#">
            <FaLinkedin className=" text-blue-400 w-5 md:w-9 h-5 md:h-9" />
          </Link>
          <Link href="#">
            <FaYoutubeSquare className=" text-red-500 w-5 md:w-9 h-5 md:h-9" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
