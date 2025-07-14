"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useUser } from "@/context/UserContext";

export default function AppointmentBooking() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);
  const [, setBookedSlots] = useState<string[]>([]);
  const [error, setError] = useState("");
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { userId } = useUser();

  useEffect(() => {
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
      // Check for duplicate booking
      const snapshot = await getDocs(collection(db, "appointments"));
      const duplicate = snapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          data.lawyerId === selectedLawyer.id &&
          data.date === date &&
          data.time === time &&
          data.status === "approved"
        );
      });

      if (duplicate) {
        toast.error("This slot is already booked!");
        return;
      }

      // Proceed with booking
      await addDoc(collection(db, "appointments"), {
        userId,
        lawyerId: selectedLawyer.id,
        date,
        time,
        status: "pending",
      });

      toast.success("Appointment booked successfully!");
      router.push("/users/");
    } catch (error) {
      toast.error("Booking failed!");
      console.error("Booking Error:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedLawyer || !date) return;

      const snapshot = await getDocs(collection(db, "appointments"));
      console.log(snapshot.docs);
      
      const bookings = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (doc: any) =>
            doc.lawyerId === selectedLawyer.id &&
            doc.date === date &&
            doc.status === "approved"
        )
        .map((doc: any) => doc.time);

      setBookedSlots(bookings); 
    };

    fetchBookedSlots();
  }, [selectedLawyer, date]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow min-h-[400px]">
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lawyer Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label>Choose Lawyer:</label>
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full border p-2 rounded flex justify-between items-center"
          >
            {selectedLawyer ? (
              <div className="flex items-center gap-2">
                <img
                  src={selectedLawyer.profileImage}
                  alt={selectedLawyer.name}
                  className="w-6 h-6 rounded-full"
                />
                <span>{selectedLawyer.name}</span>
              </div>
            ) : (
              "-- Select Lawyer --"
            )}
          </button>

          {dropdownOpen && (
            <ul className="absolute left-0 mt-1 w-full bg-white border rounded shadow z-10 max-h-60 overflow-y-auto">
              {lawyers.map((lawyer) => (
                <li
                  key={lawyer.id}
                  className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedLawyer(lawyer);
                    setDropdownOpen(false);
                    setDate(""); // clear previous selection
                    setTime(""); // clear previous selection
                    setError("");
                  }}
                >
                  <Image
                    src={lawyer.profileImage}
                    className="w-6 h-6 rounded-full"
                    alt="profile-img"
                    width={24}
                    height={24}
                  />
                  <span>{lawyer.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedLawyer && (
          <div>
            <label className="block">Date:</label>
            <DatePicker
              selected={date ? new Date(date) : null}
              onChange={(date: Date | null) => {
                if (date) {
                  const weekdayName = date.toLocaleDateString("en-US", {
                    weekday: "long",
                  });
                  if (
                    selectedLawyer &&
                    selectedLawyer.availableDays &&
                    !selectedLawyer.availableDays.includes(weekdayName)
                  ) {
                    setError(`This lawyer is not available on ${weekdayName}`);
                    setDate("");
                  } else {
                    setError("");
                    setDate(date.toISOString().split("T")[0]);
                  }
                }
              }}
              className="w-full border p-2 rounded"
              placeholderText="Select date"
              filterDate={(date) => {
                if (!selectedLawyer?.availableDays) return false;

                const weekdayName = date.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                return selectedLawyer.availableDays.includes(weekdayName);
              }}
              minDate={new Date()} // no past dates
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}

        {/* Time Slot Selector */}
        {selectedLawyer && date && (
          <div>
            <label>Available Times:</label>
            <select
              className="w-full border p-2 rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">-- Select Time --</option>
              {selectedLawyer.availableTimeSlots?.map((slot: string) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        )}

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
