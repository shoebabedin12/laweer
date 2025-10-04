"use client";

import { githublogin } from "@/lib/actions/auth";
import { BsGithub } from "react-icons/bs";

export const GithubButton = () =>{
    return(
        <button onClick={() => githublogin()} className="text-center bg-black text-white rounded-full py-2 px-4 flex justify-center items-center gap-2 max-w-[250px] mx-auto mt-5 cursor-pointer">
            <BsGithub/> Signin with github
        </button>
    )
}