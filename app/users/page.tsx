/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaUserCircle, FaCalendarCheck } from "react-icons/fa";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";


export default async function UserHomePage() {
  // const session = await getServerSession(authOptions);

  //    if (!session) {
  //      redirect("/auth/signin");
  //    }


  return (
    <div className="p-6">
      {/* <h1 className="text-3xl font-bold mb-6">
        Welcome, {userData?.name || "User"} 👋
      </h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 🧑 Profile */}
        <div className="bg-white shadow-md rounded-xl p-6 flex items-start gap-x-4">
          <FaUserCircle className="text-5xl text-gray-400" />
          <div>
            {/* <h2 className="text-xl font-semibold">{userData?.name}</h2>
            <p className="text-gray-600">{userData?.email}</p>
            <p className="mt-2 font-medium">
              Role: <span className="text-gray-800">{userData?.role}</span>
            </p> */}
          </div>
        </div>

        {/* 📅 Appointments */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FaCalendarCheck className="text-2xl text-blue-600" />
            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
          </div>

          {/* {appointments.length > 0 ? (
            <div className="space-y-4 overflow-y-auto max-h-[800px]">
              {appointments.map((a) => (
                <div
                  key={a.id}
                  className={`p-4 border rounded-md shadow-sm bg-gray-50 flex justify-between items-center ${
                    a.status === "approved"
                      ? "border-green-500 bg-green-50"
                      : a.status === "pending"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-red-500 bg-red-50"
                  }`}
                >
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-base font-medium text-gray-800">
                      {formatDateTime(a.date, a.time)}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      with <span className="font-semibold">{a.lawyerName}</span>
                    </p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      a.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : a.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No appointments found.</p>
          )} */}
        </div>
      </div>
    </div>
  );
}

function formatDateTime(date: string, time: string): string {
  const dt = new Date(`${date}T${time}`);
  return dt.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
