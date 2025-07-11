/* eslint-disable @typescript-eslint/no-explicit-any */
// components/LawyerModal.tsx
"use client";

import React from "react";
import Image from "next/image";
import { getTodayAvailabilityStatus } from "@/utility/avaiabilityCheck";

const LawyerModal = ({ data, onClose }: any) => {
  if (!data) return null;
  const { today, isAvailable } = getTodayAvailabilityStatus(data.availability);

  const {
    id,
    name,
    image,
    license,
    experience,
    availability,
    consultationFee,
  } = data;

  console.log(today);
  console.log(isAvailable);

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
            src={image}
            alt={name}
            loading="lazy"
            width={308}
            height={308}
            className="rounded-xl w-full max-w-[308px] h-[308px] object-cover"
          />
        </figure>
        <div>
          <p className="font-mulish bg-(--color-badge-blue)/10 text-[12px] font-medium text-(--color-badge-blue) py-[5px] px-3.5 rounded-full mb-4 inline-block">
            {experience}
          </p>
          <h2 className="text-xl font-bold mb-2">{name}</h2>
          <p className="text-sm text-gray-700 mb-1">
            Criminal Expert {license}
          </p>
          <p className="text-sm text-gray-700 mb-5 flex items-center justify-items-start gap-2">
            Availability{" "}
            {availability?.map((item: any) => (
              <span
                key={id}
                className="font-mulish bg-(--color-badge-blue)/10 text-[12px] font-medium text-(--color-badge-blue) py-[5px] px-3.5 rounded-full"
              >
                {item}
              </span>
            ))}
          </p>
          <p className="text-sm text-gray-700 mb-1">
            Consultation Fee:{" "}
            <span className="text-primary">Taka : {consultationFee}</span>
          </p>
          <p className="text-sm text-gray-700 mb-5">
            Availability{" "}
            <span className={isAvailable ? "text-primary" : "text-red-600"}>
              {isAvailable
                ? `Available on ${today}`
                : `Not available on ${today}`}
            </span>
          </p>

          <button
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
