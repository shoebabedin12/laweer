/* eslint-disable react-hooks/exhaustive-deps */
 
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

type MeResponse = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export const UserContext = createContext<{ userId: string | null }>({ userId: null });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const API_BASE = process.env.NEXT_PUBLIC_APP_API_KEY;
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem('token');
      if (!token) {
        router.replace("/signin");
        return;
      }
      try {
        const res = await axios.get<MeResponse>(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.data.id.toString());
      } catch (err) {
        console.error("Failed to load user", err);
        setUserId(null);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
