/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/logo.png";
import { GithubButton } from "./github-sign-in-button";
import { GoogleButton } from "./GoogleButton";
import { credentialslogin } from "@/lib/actions/auth";


export default async function LoginComponent() {

  return (
    <>
      <header className="w-full top-0 z-50 bg-white shadow-md">
        <div className="container">
          <div className="flex items-center justify-center py-6">
            <Link href="/" className="flex items-center gap-4">
              <Image src={logo} alt="Logo" />
              <h1 className="lg:text-3xl font-bold text-2xl text-gray-900">Law.BD</h1>
            </Link>
          </div>
        </div>
      </header>

      <div className="my-[100px]">
        <div className="container">
          <div className="shadow-2xl max-w-[600px] mx-auto rounded-2xl py-5 px-8">
            <form action={''} className="grid grid-cols-12 gap-4 mb-5">
              <div className="col-span-12">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="outline-1 w-full py-2 px-3 mt-2 rounded-md" placeholder="Enter your email" />
              </div>
              <div className="col-span-12">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="outline-1 w-full py-2 px-3 mt-2 rounded-md" placeholder="Enter your password" />
              </div>
              <div className="col-span-12">
                <button type="submit" className="bg-primary py-2 px-5 w-full rounded-md text-white cursor-pointer">Login</button>
              </div>
            </form>
            <GithubButton />
            <GoogleButton />
          </div>
        </div>
      </div>
    </>
  );
}
