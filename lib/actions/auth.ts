"use server"

import { signIn, signOut } from "@/auth"

export const githublogin = async () => {
    await signIn("github", {redirectTo: '/'})
}
export const githublogout = async () => {
    await signOut({redirectTo: '/'})
}

export const googlelogin = async () => {
    await signIn("google", {redirectTo: '/'})
}
export const googlelogout = async () => {
    await signOut({redirectTo: '/'})
}