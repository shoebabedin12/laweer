"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Lawyer {
  id: string;
  name: string;
  profileImage: string;
  availableDays?: string[];
  availableTimeSlots?: string[];
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  status: string;
  lawyerId: string;
  userId: string;
}

export default function AppointmentBooking() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [bookedSlotsByDate, setBookedSlotsByDate] = useState<{ [key: string]: string[] }>({});
  const [error, setError] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch lawyers from backend API
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get<{ lawyers: Lawyer[] }>(`${API_BASE}/users?role=lawyer`);
        setLawyers(res.data.lawyers);
      } catch (err) {
        console.error("Failed to fetch lawyers", err);
      }
    };
    fetchLawyers();
  }, [API_BASE]);

  // Fetch booked appointments for selected lawyer from backend API
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedLawyer) return;
      try {
        const res = await axios.get<{ appointments: Appointment[] }>(
          `${API_BASE}/appointments/lawyer/${selectedLawyer.id}`
        );
        // Filter approved appointments grouped by date with their times
        const approvedAppointments = res.data.appointments.filter(a => a.status === "approved");
        const grouped: { [key: string]: string[] } = {};
        approvedAppointments.forEach((a) => {
          if (!grouped[a.date]) grouped[a.date] = [];
          grouped[a.date].push(a.time);
        });
        setBookedSlotsByDate(grouped);
      } catch (err) {
        console.error("Failed to fetch booked appointments", err);
      }
    };
    fetchBookedSlots();
  }, [selectedLawyer, API_BASE]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLawyer || !date || !time) {
      toast.error("Please select lawyer, date and time");
      return;
    }

    const selectedDate = date.toISOString().split("T")[0];
    const bookedTimes = bookedSlotsByDate[selectedDate] || [];
    if (bookedTimes.includes(time)) {
      toast.error("This slot is already booked!");
      return;
    }

    try {
      await axios.post(`${API_BASE}/appointments`, {
        lawyerId: selectedLawyer.id,
        date: selectedDate,
        time,
        status: "pending",
      });
      toast.success("Appointment booked successfully!");
      router.push("/users");
    } catch (err) {
      toast.error("Booking failed!");
      console.error("Booking error:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
                <Image
                  src={selectedLawyer.profileImage}
                  alt={selectedLawyer.name}
                  width={24}
                  height={24}
                  className="rounded-full"
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
                    setDate(null);
                    setTime("");
                    setError("");
                  }}
                >
                  <Image
                    src={lawyer.profileImage}
                    alt={lawyer.name}
                    width={24}
                    height={24}
                    className="rounded-full"
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
              selected={date}
              onChange={(d) => {
                if (d) {
                  const weekdayName = d.toLocaleDateString("en-US", { weekday: "long" });
                  if (
                    selectedLawyer.availableDays &&
                    !selectedLawyer.availableDays.includes(weekdayName)
                  ) {
                    setError(`This lawyer is not available on ${weekdayName}`);
                    setDate(null);
                    setTime("");
                  } else {
                    setError("");
                    setDate(d);
                    setTime("");
                  }
                }
              }}
              className="w-full border p-2 rounded"
              placeholderText="Select date"
              filterDate={(d) => {
                if (!selectedLawyer.availableDays) return false;
                const weekdayName = d.toLocaleDateString("en-US", { weekday: "long" });
                const formatted = d.toISOString().split("T")[0];
                const isAvailableDay = selectedLawyer.availableDays.includes(weekdayName);
                const bookedForDate = bookedSlotsByDate[formatted] || [];
                const allBooked =
                  selectedLawyer.availableTimeSlots?.every(slot => bookedForDate.includes(slot)) ?? false;
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
            {(selectedLawyer.availableTimeSlots ?? []).filter(
              (slot) => !(bookedSlotsByDate[date.toISOString().split("T")[0]]?.includes(slot))
            ).length === 0 ? (
              <p className="text-red-500 text-sm">No available slots for this date.</p>
            ) : (
              <select
                className="w-full border p-2 rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">-- Select Time --</option>
                {(selectedLawyer.availableTimeSlots ?? [])
                  .filter((slot) => !(bookedSlotsByDate[date.toISOString().split("T")[0]]?.includes(slot)))
                  .map((slot) => (
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
