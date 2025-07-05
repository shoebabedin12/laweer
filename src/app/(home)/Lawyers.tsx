"use client";
import LawyerCard from "./LawyerCard";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Counter from "./Counter";

const Lawyers = ({ data:any }) => {
  const [displayLawyers, setDisplayLawyers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (showAll) {
      setDisplayLawyers(data);
    } else {
      setDisplayLawyers(data.slice(0, 6));
    }
  }, [data, showAll]);

  return (
    <div className="py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-8">
        {displayLawyers.map((lawyers) => (
          <LawyerCard key={lawyers.id} lawyers={lawyers}></LawyerCard>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            setShowAll((prv) => !prv)
            if (showAll) window.scrollTo(0, 600)
          }   
        }
          className="btn rounded-full font-bold bg-[#0EA106] text-white py-[22px] px-[30px] text-[18px]"
        >
          {showAll ? <><FaArrowUp />Show Less</> : <><FaArrowDown />Show All Lawyers</>}
        </button>
      </div>
      <Counter/>
    </div>
  );
};

export default Lawyers;
