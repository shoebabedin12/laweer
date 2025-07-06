"use client";

import { LawyeerDetailsPropTypes } from "@/types/DataTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LawyerCard = ({ data }: LawyeerDetailsPropTypes) => {
  const { id, image, name, experience, specialization, license, availability } = data;

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const d = new Date();
  const today = weekday[d.getDay()];
  const isAvailable = availability.includes(today);

  return (
    <div className="col-span-6">
      <div className="group bg-base-100 border border-(--color-text)/15 hover:shadow-md rounded-2xl md:mx-0 mx-auto flex p-6 gap-x-16 items-center transition-all duration-300 ease-linear">
        <figure className="rounded-2xl max-w-[159px] h-[158px] overflow-hidden">
          <Image
            className="w-full h-full object-cover rounded-2xl"
            src={image}
            alt={name}
            width={159}
            height={158}
          />
        </figure>
        <div className="card-body p-0">
          <div className="flex gap-2 mb-2">
            <span
              className={`py-[5px] px-3.5 rounded-full text-[12px] font-medium ${
                isAvailable ? "bg-(--color-badge)/10 text-(--color-badge)" : "bg-red-50 text-red-600"
              }`}
            >
              {isAvailable ? "Available" : "Not Available"}
            </span>
            <span className="font-mulish bg-(--color-badge-blue)/10 text-[12px] font-medium text-(--color-badge-blue) py-[5px] px-3.5 rounded-full">
              {experience}
            </span>
          </div>
          <h2 className="text-(-color-card-title) text-2xl font-extrabold mb-1">{name}</h2>
          <div className="text-gray-500 text-sm">
            <p className="font-mulish font-medium text-lg text-(--color-text)/60">{specialization}</p>
            <p className="font-mulish font-medium text-lg text-(--color-text)/70">&reg; License No: {license}</p>
          </div>
          <div className="mt-4">
            <Link
              href={`/lawyerDetail/${id}`}
              className="block w-full border-(--color-badge-blue)/20 group-hover:bg-(--color-badge-blue)/20 border py-2 px-5 rounded-full cursor-pointer font-bold text-sm text-center text-(--color-badge-blue) transition-all duration-300 ease-linear"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
