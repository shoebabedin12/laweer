"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";

export default function ConversationList({ userId }: { userId: string }) {
  const [conversations, setConversations] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const q = query(collection(db, "messages"), where("participants", "array-contains", userId));
      const snapshot = await getDocs(q);

      const data = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const participants = docSnap.data().participants;
          const partnerId = participants.find((id: string) => id !== userId);

          const partnerRef = doc(db, "users", partnerId);
          const partnerSnap = await getDoc(partnerRef);

          return {
            id: docSnap.id,
            name: partnerSnap.data()?.name || "Unknown",
          };
        })
      );

      setConversations(data);
    };

    fetchConversations();
  }, [userId]);

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <h2 className="text-xl font-semibold mb-3">Your Conversations</h2>
      {conversations.map((conv) => (
        <Link
          key={conv.id}
          href={`/messages/${conv.id}`}
          className="block bg-gray-100 p-3 rounded hover:bg-gray-200"
        >
          Chat with: {conv.name}
        </Link>
      ))}
    </div>
  );
}
