/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LawyerCard from "./LawyerCard";
import { useEffect, useState } from "react";
import { LawyeersPropTypes } from "@/types/DataTypes";
import Link from "next/link";

const Lawyers = (props: LawyeersPropTypes) => {
  const { data, showingOption, loading } = props;
  const [visibleLawyers, setVisibleLawyers] = useState(data);


 useEffect(() => {
    if (showingOption) {
      setVisibleLawyers(data.slice(0, showingOption));
    } else {
      setVisibleLawyers(data);
    }
  }, [data, showingOption]);

  return (
    <div className="mb-[100px]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 heading-section text-center">
          <h2 className="font-mulish font-extrabold text-[40px] text-(--color-text)">Our Best Lawyers</h2>
          <p className="font-mulish font-normal text-base text-(--color-text)/80">Our platform connects you with verified, experienced Lawyers across various specialties — all at your convenience. Whether it&apos;s a routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.</p>
        </div>
        {loading ? <div className="col-span-12">
          <p className="text-center py-10">Loading lawyers...</p>
        </div>
          :
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-4 lg:gap-16">
              {visibleLawyers.map((lawyers) => (
                <LawyerCard key={lawyers.uid} data={lawyers}></LawyerCard>
              ))}
            </div>
          </div>}
      </div>
      {showingOption && visibleLawyers.length > 0 && <div className="flex items-center justify-center my-10">
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
