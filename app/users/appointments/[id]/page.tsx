"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useUser } from "@/context/UserContext";

export default function AppointmentBooking() {
  const { id } = useParams();
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState<{ [key: string]: string[] }>({});
  const [error, setError] = useState("");
 const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { userId } = useUser();

  useEffect(() => {
    const fetchLawyers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs
        .filter((doc) => doc.data().role === "lawyer")
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setLawyers(data);

      // Auto-select lawyer by URL id if present
    if (id) {
      const matchedLawyer = data.find((lawyer) => lawyer.id === id);
      if (matchedLawyer) {
        setSelectedLawyer(matchedLawyer);
        setDropdownOpen(false);
      }
    }
    
    };
    fetchLawyers();
  }, []);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedLawyer) return;

      const snapshot = await getDocs(collection(db, "appointments"));
      const bookings = snapshot.docs
        .map((doc) => doc.data())
        .filter(
          (doc: any) =>
            doc.lawyerId === selectedLawyer.id &&
            doc.status === "approved"
        );

      const groupedByDate: { [key: string]: string[] } = {};
      bookings.forEach((b: any) => {
        if (!groupedByDate[b.date]) groupedByDate[b.date] = [];
        groupedByDate[b.date].push(b.time);
      });

      setBookedSlotsByDate(groupedByDate);
    };

    fetchBookedSlots();
  }, [selectedLawyer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLawyer || !date || !time) {
      toast.error("All fields are required");
      return;
    }

    const bookedForDate = bookedSlotsByDate[date] || [];
    if (bookedForDate.includes(time)) {
      toast.error("This slot is already booked!");
      return;
    }

    try {
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
                    setDate("");
                    setTime("");
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

        {/* Date Picker */}
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
                    selectedLawyer?.availableDays &&
                    !selectedLawyer.availableDays.includes(weekdayName)
                  ) {
                    setError(`This lawyer is not available on ${weekdayName}`);
                    setDate("");
                  } else {
                    setError("");
                    setDate(date.toISOString().split("T")[0]);
                    setTime("");
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
                const formatted = date.toISOString().split("T")[0];

                const isAvailableDay = selectedLawyer.availableDays.includes(
                  weekdayName
                );

                const bookedForDate = bookedSlotsByDate[formatted] || [];
                const allBooked =
                  selectedLawyer.availableTimeSlots?.every((slot: string) =>
                    bookedForDate.includes(slot)
                  ) ?? false;

                return isAvailableDay && !allBooked;
              }}
              minDate={new Date()}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}

        {/* Time Slot Selector */}
        {selectedLawyer && date && (
          <div>
            <label>Available Times:</label>
            {selectedLawyer.availableTimeSlots?.filter(
              (slot: string) =>
                !bookedSlotsByDate[date]?.includes(slot)
            ).length === 0 ? (
              <p className="text-red-500 text-sm">
                No available slots for this date.
              </p>
            ) : (
              <select
                className="w-full border p-2 rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">-- Select Time --</option>
                {selectedLawyer.availableTimeSlots
                  .filter((slot: string) => !bookedSlotsByDate[date]?.includes(slot))
                  .map((slot: string) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
              </select>
            )}
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
