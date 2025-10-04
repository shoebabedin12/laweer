/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { authOptions } from "@/lib/nextAuth";
// import { getServerSession } from "next-auth"; // v4 import
import { NextResponse } from "next/server";

export async function GET(request: any) {
  // const session = await getServerSession(authOptions);
  return NextResponse.json({ id: 1 });
}
