"use client";

import { googlelogin } from "@/lib/actions/auth";
import { BsGoogle } from "react-icons/bs";

export const GoogleButton = () =>{
    return(
        <button onClick={() => googlelogin()} className="text-center bg-black text-white rounded-full py-2 px-4 flex justify-center items-center gap-2 max-w-[250px] mx-auto mt-5 cursor-pointer">
            <BsGoogle/> Signin with Google
        </button>
    )
}