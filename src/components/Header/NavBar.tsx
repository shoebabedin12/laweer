import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
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
            <li>
              <Link
                href="/"
                className="relative inline-block after:block after:content-[''] after:w-0 after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="relative inline-block after:block after:content-[''] after:w-0 after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium"
              >
                Lawyer profile
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                className="relative inline-block after:block after:content-[''] after:w-0 after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium"
              >
                Booking form
              </Link>
            </li>
            <li>
              <Link
                href="/contactUs"
                className="relative inline-block after:block after:content-[''] after:w-0 after:h-[2px] after:bg-(--color-primary) after:transition-[width] after:duration-300 hover:after:w-full text-(--color-text)/70 text-[18px] font-medium"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <Link
            href={"/"}
            className="btn rounded-full font-bold bg-[#0EA106] text-white py-[15px] px-[30px] text-[18px]"
          >
            Register/Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
