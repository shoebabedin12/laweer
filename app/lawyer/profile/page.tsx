/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function LawyerProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([""]);
  const [previewImageData, setPreviewImageData] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/lawyers/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        console.log(data);
        

        setName(data.name || "");
        setSpecialization(data.specialization || "");
        setExperience(data.experience || "");
        setDescription(data.description || "");
        setAvailableDays(data.availableDays || []);
        setTimeSlots(
          data.availableTimeSlots?.length ? data.availableTimeSlots : [""]
        );
        setPreviewImageData(data.profileImage || "");
      } catch (err) {
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router, token]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/lawyers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          specialization,
          experience,
          description,
          availableDays,
          availableTimeSlots: timeSlots,
          profileImage: previewImageData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeChange = (index: number, value: string) => {
    const newSlots = [...timeSlots];
    newSlots[index] = value;
    setTimeSlots(newSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, ""]);
  };

  const removeTimeSlot = (index: number) => {
    if (timeSlots.length === 1) return;
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviewImageData(base64String);
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Lawyer Profile</h1>
      <form
        onSubmit={handleUpdate}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <div className="avatar-upload">
          <div className="avatar-edit">
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg, .webp"
              onChange={handleImageChange}
            />
            <label htmlFor="imageUpload">
              <MdModeEdit />
            </label>
          </div>
          <div className="avatar-preview">
            <div
              id="imagePreview"
              style={{
                backgroundImage: `url(${
                  previewImageData || "/assets/lawyer.png"
                })`,
              }}
              className="w-32 h-32 rounded-full bg-gray-200 bg-center bg-cover"
            ></div>
          </div>
        </div>

        <div>
          <label className="block font-semibold">Full Name</label>
          <input
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Specialization</label>
          <input
            className="w-full p-2 border rounded"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold">Experience (years)</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Available Days</label>
          <div className="flex flex-wrap gap-2">
            {weekdays.map((day) => (
              <label key={day} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={availableDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>Available Time Slots:</label>
          {timeSlots.map((time, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                required
                className="border rounded p-1"
              />
              <button
                type="button"
                onClick={() => removeTimeSlot(index)}
                disabled={timeSlots.length === 1}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTimeSlot}
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            Add Time Slot
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
