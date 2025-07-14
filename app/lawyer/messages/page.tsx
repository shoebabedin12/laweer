"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AppointmentBooking() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    // ✅ Auth check and set userId
    onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });

    // ✅ Fetch lawyers
    const fetchLawyers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs
        .filter((doc) => doc.data().role === "lawyer")
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setLawyers(data);
    };
    fetchLawyers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLawyer || !date || !time) {
      toast.error("All fields are required");
      return;
    }

    try {
      // ✅ Add appointment
      await addDoc(collection(db, "appointments"), {
        userId,
        lawyerId: selectedLawyer,
        date,
        time,
        status: "pending",
        createdAt: Timestamp.now(),
      });

      // ✅ Check if conversation already exists
      const convoQuery = query(
        collection(db, "conversations"),
        where("userId", "==", userId),
        where("lawyerId", "==", selectedLawyer)
      );
      const convoSnap = await getDocs(convoQuery);
      if (convoSnap.empty) {
        await addDoc(collection(db, "conversations"), {
          userId,
          lawyerId: selectedLawyer,
          createdAt: Timestamp.now(),
        });
      }

      toast.success("Appointment booked and chat ready!");
      router.push("/user/appointments");
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Choose Lawyer:</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedLawyer}
            onChange={(e) => setSelectedLawyer(e.target.value)}
          >
            <option value="">-- Select Lawyer --</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id}>
                {lawyer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Time:</label>
          <input
            type="time"
            className="w-full border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
}
