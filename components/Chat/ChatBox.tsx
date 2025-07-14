"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { MessageType } from "@/types/DataTypes";

export default function ChatBox({
  currentUserId,
  recipientId,
}: {
  currentUserId: string;
  recipientId: string;
}) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const conversationId =
    currentUserId < recipientId
      ? `${currentUserId}_${recipientId}`
      : `${recipientId}_${currentUserId}`;

  useEffect(() => {
    const q = query(
      collection(db, "messages", conversationId, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as MessageType[];
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, "messages", conversationId, "messages"), {
      senderId: currentUserId,
      receiverId: recipientId,
      text: newMessage.trim(),
      timestamp: serverTimestamp(),
    });
    setNewMessage("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full max-w-md border rounded shadow p-4">
      <div className="h-[400px] overflow-y-auto space-y-2 mb-3 p-2 bg-gray-100 rounded">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-2 rounded ${
              msg.senderId === currentUserId
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded px-2 py-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
