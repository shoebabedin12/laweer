/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function UserProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token");

      if (!token) {
        router.replace("/signin");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUserData(data);
        setName(data.name);
        setLoading(false);
      } catch (err) {
        router.replace("/signin");
      }
    };

    fetchUser();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Update failed");
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
