'use client';
import { layerData } from "@/data/lawyer-data";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/firestore";
import Counter from "@/components/Counter";
import Lawyers from "@/components/Lawyers";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    getUsers().then(users => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;


  return (
    <div className="container">
      <Banner />
      <Lawyers layerData={layerData} showingOption={6}></Lawyers>
      <Counter/>
       {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
    </div>
  );
}
