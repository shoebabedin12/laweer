/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import { getTodayAvailabilityStatus } from "@/utility/avaiabilityCheck";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const LawyerModal = ({ data, onClose }: any) => {
    const router = useRouter();
  const [user] = useAuthState(auth);

  if (!data) return null;

  const { uid, name, profileImage, specialization, experience, availableDays } =
    data;

  const { today, isAvailable } = getTodayAvailabilityStatus(data.availableDays);

  const handleBooking = async () => {
    if (!isAvailable) return;
    if (!user) {
      toast.error("Please log in for appointment.");
      router.push(`/signin?redirectTo=/users/appointments/${uid}`);
      return;
    }
     router.push(`/users/appointments/${uid}`);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-auto relative flex items-center gap-4">
        <div>
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 cursor-pointer bg-primary w-10 h-10 rounded-full text-white"
          >
            ✕
          </button>
        </div>
        <figure>
          <Image
            src={profileImage}
            alt={name}
            loading="lazy"
            width={308}
            height={308}
            className="rounded-xl w-full max-w-[308px] h-[308px] object-cover"
          />
        </figure>
        <div>
          <p className="font-mulish bg-(--color-badge-blue)/10 text-[12px] font-medium text-(--color-badge-blue) py-[5px] px-3.5 rounded-full mb-4 inline-block">
            Experience: {experience} Years
          </p>
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-sm text-gray-700 mb-1">{specialization}</p>
          <p className="text-sm text-gray-700 mb-5 flex items-center justify-items-start gap-2">
            Availability{" "}
            {availableDays?.map((day: string) => (
              <span
                 key={day}
                className="font-mulish bg-(--color-badge-blue)/10 text-[12px] font-medium text-(--color-badge-blue) py-[5px] px-3.5 rounded-full"
              >
                {day}
              </span>
            ))}
          </p>
          <p className="text-sm text-gray-700 mb-5">
            <span className={isAvailable ? "text-primary" : "text-red-600"}>
              {isAvailable
                ? `Available on ${today}`
                : `Not available on ${today}`}
            </span>
          </p>

          <button
            onClick={handleBooking}
            disabled={!isAvailable}
            className={`block w-full border-(--color-badge-blue)/20 ${
              isAvailable
                ? "hover:bg-(--color-badge-blue)/20 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } border py-2 px-5 rounded-full font-bold text-sm text-center text-(--color-badge-blue) transition-all duration-300 ease-linear`}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerModal;
