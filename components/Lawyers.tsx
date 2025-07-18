"use client";
import LawyerCard from "./LawyerCard";
import { useEffect, useState } from "react";
import { LawyeersPropTypes, LawyerDataType } from "@/types/DataTypes";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Lawyers = ({ showingOption }: LawyeersPropTypes) => {
  const [displayLawyers, setDisplayLawyers] = useState<LawyerDataType[]>([]);
  const [visibleLawyers, setVisibleLawyers] = useState(displayLawyers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<LawyerDataType, "id">),
          }))
          .filter((doc: LawyerDataType) => doc.role === "lawyer");

        setDisplayLawyers(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
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

  return (
    <div className="mb-[100px]">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 heading-section text-center">
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
              {visibleLawyers.map((lawyers) => (
                <LawyerCard key={lawyers.uid} data={lawyers}></LawyerCard>
              ))}
            </div>
          </div>
        )}
      </div>
      {showingOption && loading !== true && (
        <div className="flex items-center justify-center my-10">
          <Link
            href="/lawyers-profile"
            className="flex items-center justify-center gap-2 rounded-full font-bold bg-(--color-primary) text-white py-2 px-[30px] text-[18px] cursor-pointer"
          >
            Show More
          </Link>
        </div>
      )}
    </div>
  );
};

export default Lawyers;
