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
        <div className="group bg-base-100 border border-(--color-text)/15 hover:shadow-md rounded-2xl grid grid-cols-12 p-6 items-center gap-4 transition-all duration-300 ease-linear">
          <div className="col-span-12 lg:col-span-4 relative">
              {isAvailable && <span className="absolute flex size-3 right-0 ">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>}
            <div className="rounded-2xl lg:max-w-[159px] w-full h-full lg:h-[158px] overflow-hidden">
             <Image className="w-full h-full object-cover rounded-2xl"
                src={data.profileImage || ''}
                alt={data?.name || "Name"}
                width={159}
                height={158}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
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
                {data.experience} years
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
              <button
                onClick={() => handleViewDetails(data)}
                className="w-full border-(--color-badge-blue)/20 group-hover:bg-(--color-badge-blue)/20 border py-2 px-5 rounded-full cursor-pointer font-bold text-sm text-center text-(--color-badge-blue) transition-all duration-300 ease-linear mt-4"
              >
                View Details
              </button>
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
