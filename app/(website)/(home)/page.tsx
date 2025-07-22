'use client';

import Banner from "./Banner";
import { useEffect, useState } from "react";
import Counter from "@/components/Counter";
import Lawyers from "@/components/Lawyers";
import { LawyerDataType } from "@/types/DataTypes";
import axios from "axios";

export default function Home() {
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
    <div className="container">
      <Banner />
      <Lawyers data={displayLawyers} showingOption={6} loading={loading} />
      <Counter />
    </div>
  );
}
