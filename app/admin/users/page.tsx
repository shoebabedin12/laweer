/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import DataTable from "react-data-table-component";
import { FaLock, FaLockOpen, FaTrash } from "react-icons/fa";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  blocked: boolean;
  profileImage?: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<any[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumns([
        {
          name: "Name",
          selector: (row: UserData) => row.name,
          sortable: true,
        },
        {
          name: "Email",
          selector: (row: UserData) => row.email,
          sortable: true,
        },
        {
          name: "Image",
          cell: (row: UserData) =>
            row.profileImage ? (
              <Image
                src={row.profileImage}
                alt={row.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <p>No Image</p>
            ),
          ignoreRowClick: true,
          allowOverflow: true,
        },
        {
          name: "Status",
          cell: (row: UserData) => (
            <span
              className={`px-2 py-1 rounded text-sm ${
                row.blocked
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {row.blocked ? "Blocked" : "Active"}
            </span>
          ),
          sortable: true,
        },
        {
          name: "Role",
          selector: (row: UserData) => row.role,
          sortable: true,
        },
        {
          name: "Actions",
          cell: (row: UserData) => (
            <div className="space-x-2">
              <button
                onClick={() => handleBlockToggle(row.id, row.blocked)}
                className={`text-sm flex items-center gap-1 px-3 py-1 rounded cursor-pointer ${
                  row.blocked
                    ? "bg-green-200 text-green-900"
                    : "bg-yellow-200 text-yellow-900"
                }`}
              >
                {row.blocked ? <FaLockOpen /> : <FaLock />}
              </button>
              <button
                onClick={() => handleDelete(row.id)}
                className="text-sm flex items-center gap-1 px-3 py-1 bg-red-200 text-red-900 rounded cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
      ]);
      setPending(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [users]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        const userData: UserData[] = data.filter((u: UserData) => u.role !== "admin");
        setUsers(userData);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockToggle = async (id: string, blocked: boolean = false) => {
    try {
      await fetch(`/api/users/${id}/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: !blocked }),
      });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, blocked: !blocked } : user
        )
      );
    } catch (err) {
      console.error("Error updating block status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <DataTable
        columns={columns}
        data={users}
        progressPending={pending || loading}
        pagination
        highlightOnHover
        responsive
        striped
      />
    </div>
  );
}
