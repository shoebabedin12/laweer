import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const logout = async () => {
  try {
    // Firebase: remove session from client
    await signOut(auth);

    // Optional: clear your custom session (e.g. cookie)
    await fetch("/api/session", {
      method: "DELETE",
    });

    console.log("Logged out.");
  } catch (error) {
    console.error("Logout error:", error);
  }
};