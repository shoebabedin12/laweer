"use client";
import LawyerCard from "./LawyerCard";
import { useEffect, useState } from "react";
import { LawyeersPropTypes, LawyerDataType } from "@/types/DataTypes";
import Link from "next/link";

const Lawyers = (props: LawyeersPropTypes) => {
  const { layerData, showingOption } = props;
  const [displayLawyers, setDisplayLawyers] = useState<LawyerDataType[]>([]);

  useEffect(() => {
    if (showingOption) {
      setDisplayLawyers(layerData.slice(0, showingOption));
    }else{
      setDisplayLawyers(layerData);
    }
  }, [layerData, showingOption]);

  return (
    <div className="mb-[100px]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 heading-section text-center">
          <h2 className="font-mulish font-extrabold text-[40px] text-(--color-text)">Our Best Lawyers</h2>
          <p className="font-mulish font-normal text-base text-(--color-text)/80">Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience. Whether it&apos;s a routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>
        </div>
        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-16">
            {displayLawyers.map((lawyers) => (
              <LawyerCard key={lawyers.id} data={lawyers}></LawyerCard>
            ))}
          </div>
        </div>
      </div>
      {showingOption && <div className="flex items-center justify-center my-10">
        <Link
          href="/lawyers-profile"
          className="flex items-center justify-center gap-2 rounded-full font-bold bg-(--color-primary) text-white py-[22px] px-[30px] text-[18px] cursor-pointer"
        >
         Show More Lawyers
        </Link>
      </div>
      }
    </div>
  );
};

export default Lawyers;
