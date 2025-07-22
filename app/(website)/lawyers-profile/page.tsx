"use client";

import Lawyers from "@/components/Lawyers";
import { LawyerDataType } from "@/types/DataTypes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LawyersProfile = () => {
  const [loading, setLoading] = useState(true);
  const [displayLawyers, setDisplayLawyers] = useState<LawyerDataType[]>([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/lawyers`);
        setDisplayLawyers(res.data || []);
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <div className="mt-[100px]">
      <div className="container">
        <Lawyers data={displayLawyers} loading={loading} />
      </div>
    </div>
  );
};

export default LawyersProfile;
