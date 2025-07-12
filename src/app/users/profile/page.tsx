/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.replace("/signin");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserData(data);
        setName(data.name);
      }
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);

      await updateDoc(userRef, {
        name: name.trim(),
      });

      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
      });

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Update failed");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold !mb-6">My Profile</h1>

      <form onSubmit={handleUpdate} className="!space-y-4 bg-white !p-6 rounded shadow">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 !px-4 !py-2 rounded"
            required
          />
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={userData?.email}
            disabled
            className="w-full border border-gray-300 !px-4 !py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Role (read-only) */}
        <div>
          <label className="block font-medium mb-1">Role</label>
          <input
            type="text"
            value={userData?.role}
            disabled
            className="w-full border border-gray-300 !px-4 !py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white !px-6 !py-2 rounded font-medium"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
