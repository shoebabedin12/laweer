/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LawyeerDetailsPropTypes } from "@/types/DataTypes";
import Image from "next/image";
import React, { useState } from "react";
import LawyerModal from "./LawyerModal";

const LawyerCard = ({ data }: LawyeerDetailsPropTypes) => {
 
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (data: any) => {
    setSelectedLawyer(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLawyer(null);
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  const today = weekday[d.getDay()];
  const isAvailable = Array.isArray(data.availableDays) && data.availableDays.includes(today);

  return (
    <>
      <div className="col-span-12 md:col-span-6">
        <div className="group bg-base-100 border border-(--color-text)/15 hover:shadow-md rounded-2xl md:mx-0 mx-auto flex p-6 gap-x-10 items-center transition-all duration-300 ease-linear">
          <figure className="rounded-2xl max-w-[159px] h-[158px] overflow-hidden">
            <Image
              className="w-full h-full object-cover rounded-2xl"
              src={data.profileImage}
              alt={data.name}
              width={159}
              height={158}
            />
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
          </figure>
          <div className="card-body p-0">
            <div className="flex gap-2 mb-2">
              <span
                className={`py-[5px] px-3.5 rounded-full text-[12px] font-medium ${
                  data.availableDays
                    ? "bg-(--color-badge)/10 text-(--color-badge)"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {isAvailable ? "Available" : "Not Available"}
              </span>
              <span className="font-mulish bg-(--color-badge-blue)/10 text-[12px] font-medium text-(--color-badge-blue) py-[5px] px-3.5 rounded-full">
                {data.experience}
              </span>
            </div>
            <h2 className="text-(-color-card-title) text-2xl font-extrabold mb-1 truncate">
              {data.name}
            </h2>
            <div className="text-gray-500 text-sm">
              <p className="font-mulish font-medium text-lg text-(--color-text)/60">
                {data.specialization}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleViewDetails(data)}
                className="block w-full border-(--color-badge-blue)/20 group-hover:bg-(--color-badge-blue)/20 border py-2 px-5 rounded-full cursor-pointer font-bold text-sm text-center text-(--color-badge-blue) transition-all duration-300 ease-linear"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <LawyerModal
        data={selectedLawyer}
        onClose={closeModal}
        isModalOpen={isModalOpen}
      />
    </>
  );
};

export default LawyerCard;
