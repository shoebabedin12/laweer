'use client';
import { layerData } from "@/data/lawyer-data";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/firestore";
import Counter from "@/components/Counter";
import Lawyers from "@/components/Lawyers";
import { LawyerDataType } from "@/types/DataTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <div className="container">
      <Banner />
      <Lawyers data={displayLawyers} showingOption={6} loading={loading}/>
      <Counter/>
    </div>
  );
}
