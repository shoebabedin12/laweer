/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

export const UserContext = createContext<{ userId: string | null }>({ userId: null });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
   const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      // SSR check
      if (typeof window === "undefined") return;

      const token = localStorage.getItem('token');
      if (!token) {
        router.replace("/signin");
        return;
      }

      if (token) {
        try {
          const res = await axios.get(`${API_BASE}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserId(res.data.id); // Adjust based on your backend's /me response
        } catch (err) {
          console.error("Failed to load user", err);
          setUserId(null);
        }
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
