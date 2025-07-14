"use client";

import ChatBox from "@/components/Chat/ChatBox";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ChatPage() {
  const { conversationId } = useParams();
  const router = useRouter();

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [recipientId, setRecipientId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        router.replace("/signin"); // Not logged in
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (currentUserId && typeof conversationId === "string") {
      const [user1, user2] = conversationId.split("_");

      if (!user1 || !user2) {
        router.replace("/not-found"); // Invalid conversationId
        return;
      }

      const otherUserId = user1 === currentUserId ? user2 : user1;
      setRecipientId(otherUserId);
    }
  }, [conversationId, currentUserId, router]);

  if (!currentUserId || !recipientId) return <p>Loading chat...</p>;

  return (
    <div className="p-4">
      <ChatBox currentUserId={currentUserId} recipientId={recipientId} />
    </div>
  );
}
