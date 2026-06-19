import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const enquiries = await db
      .collection("enquiries")
      .find({})
      .sort({ created_at: -1 })
      .limit(100) // limit to recent 100 for performance
      .toArray();

    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    console.error("Fetch Enquiries Error:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
