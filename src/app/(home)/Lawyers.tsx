"use client";
import LawyerCard from "./LawyerCard";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Counter from "./Counter";
import { LawyeersPropTypes, LawyerDataType } from "@/types/DataTypes";

const Lawyers = (props: LawyeersPropTypes) => {
  const { layerData } = props;
  const [displayLawyers, setDisplayLawyers] = useState<LawyerDataType[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (showAll) {
      setDisplayLawyers(layerData);
    } else {
      setDisplayLawyers(layerData.slice(0, 6));
    }
  }, [layerData, showAll]);

  return (
    <div className="py-12">
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
      {displayLawyers && <div className="flex items-center justify-center my-10">
        <button
          onClick={() => {
            setShowAll((prv) => !prv)
            if (showAll) window.scrollTo(0, 600)
          }   
        }
          className="group flex items-center justify-center gap-2 rounded-full font-bold bg-(--color-primary) text-white py-[22px] px-[30px] text-[18px] cursor-pointer"
        >
          {showAll ? <><FaArrowUp className="group-hover:animate-bounce"/>Show Less</> : <><FaArrowDown className="group-hover:animate-bounce"/>Show All Lawyers</>}
        </button>
      </div>
      }
      <Counter/>
    </div>
  );
};

export default Lawyers;
