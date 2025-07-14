"use client";
import Lawyers from "@/components/Lawyers";
import { db } from "@/lib/firebase";
import { LawyerDataType } from "@/types/DataTypes";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const LawyersProfile = () => {
  const [loading, setLoading] = useState(true);
  const [displayLawyers, setDisplayLawyers] = useState<LawyerDataType[]>([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs
          .map(doc => ({ id: doc.id, ...(doc.data() as Omit<LawyerDataType, 'id'>) }))
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

  return (
    <div className="mt-[100px]">
      <div className="container">
        <Lawyers data={displayLawyers} loading={loading} />
      </div>
    </div>
  );
};

export default LawyersProfile;
