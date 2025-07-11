"use client";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserData } from "@/types/DataTypes";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, 'users'));

        const userData: UserData[] = snap.docs
          .filter((doc) => doc.data().role !== 'admin')
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<UserData, 'id'>),
          }));

        setUsers(userData);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockToggle = async (id: string, blocked: boolean) => {
    await updateDoc(doc(db, "users", id), { blocked: !blocked });
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, blocked: !blocked } : user
      )
    );
  };

   const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    await deleteDoc(doc(db, 'users', id));
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.blocked ? 'Blocked' : 'Active'}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleBlockToggle(u.id, u.blocked)}
                    className={`text-sm px-3 py-1 rounded cursor-pointer ${
                      u.blocked ? 'bg-green-200' : 'bg-yellow-200'
                    }`}
                  >
                    {u.blocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-sm px-3 py-1 bg-red-200 rounded cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
