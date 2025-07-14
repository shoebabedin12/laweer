/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";
import Image from "next/image";

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
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([""]);
  const [previewImageData, setPreviewImageData] = useState<string>("");
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
        setName(data.name || "");
        setSpecialization(data.specialization || "");
        setExperience(data.experience || "");
        setDescription(data.description || "");
        setAvailableDays(data.availableDays || []);
        setTimeSlots(data.availableTimeSlots || [""]);
        setPreviewImageData(data.previewImage || "");
      }
      setLoading(false);

    };

    fetchUser();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        name: name.trim(),
        specialization,
        experience,
        description,
        availableDays,
        availableTimeSlots: timeSlots,
        profileImage: previewImageData,
      });

      await updateProfile(currentUser, { displayName: name.trim() });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Update failed");
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

  // Add new empty time slot input
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
      setPreviewImageData(base64String); // save for preview + db
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
              style={{ backgroundImage: `url(${previewImageData})` }}
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
            <div key={index} style={{ marginBottom: "8px" }}>
              <input
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeTimeSlot(index)}
                disabled={timeSlots.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addTimeSlot}>
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
