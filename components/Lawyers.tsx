'use client';

import LawyerCard from "./LawyerCard";
import { useEffect, useState } from "react";
import { LawyeersPropTypes, LawyerDataType } from "@/types/DataTypes";
import Link from "next/link";

const Lawyers = ({ showingOption }: LawyeersPropTypes) => {
  const [displayLawyers, setDisplayLawyers] = useState<LawyerDataType[]>([]);
  const [visibleLawyers, setVisibleLawyers] = useState<LawyerDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchLawyers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_KEY}/lawyers`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      // Assuming API response looks like: { total: number, lawyers: LawyerDataType[] }
      setDisplayLawyers(data.lawyers || []); // only store array in state
    } catch (error) {
      console.error("Failed to fetch lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchLawyers();
}, []);

  

useEffect(() => {
  if (showingOption) {
    setVisibleLawyers(displayLawyers.slice(0, showingOption));
  } else {
    setVisibleLawyers(displayLawyers);
  }
}, [displayLawyers, showingOption]);

  // console.log(visibleLawyers);
  

  return (
    <div className="mb-[100px]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 heading-section text-center mb-10">
          <h2 className="font-mulish font-extrabold text-[40px] text-(--color-text)">
            Our Best Lawyers
          </h2>
          <p className="font-mulish font-normal text-base text-(--color-text)/80">
            Our platform connects you with verified, experienced Lawyers across
            various specialties — all at your convenience. Whether it&apos;s a
            routine checkup or urgent consultation, book appointments in minutes
            and receive quality care you can trust.
          </p>
        </div>

        {loading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="col-span-12 md:col-span-6 animate-pulse">
                <div className="bg-base-100 border border-(--color-text)/15 rounded-2xl grid grid-cols-12 p-6 gap-4">
                  <div className="col-span-12 lg:col-span-4">
                    <div className="bg-gray-300 rounded-2xl w-full h-[158px]" />
                  </div>
                  <div className="col-span-12 lg:col-span-8 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-1/4" />
                    <div className="h-6 bg-gray-300 rounded w-2/3" />
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                    <div className="h-10 bg-gray-300 rounded w-full mt-4" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-4 lg:gap-16">
              {visibleLawyers?.map((lawyer) => (
                <LawyerCard key={lawyer.uid} data={lawyer} />
              ))}
            </div>
          </div>
        )}
      </div>

      {showingOption && displayLawyers.length > 0 && (
        <div className="flex items-center justify-center my-10">
          <Link
            href="/lawyers-profile"
            className="flex items-center justify-center gap-2 rounded-full font-bold bg-(--color-primary) text-white py-[22px] px-[30px] text-[18px] cursor-pointer"
          >
            Show More Lawyers
          </Link>
        </div>
      )}
    </div>
  );
};

export default Lawyers;
