import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: Request, { params }: { params: Promise<{ page: string }> }) {
  const resolvedParams = await params;
  try {
    const db = await getDb();
    const banner = await db.collection("banners").findOne({ page: resolvedParams.page });

    if (banner && banner.image_url) {
      return NextResponse.json({ url: banner.image_url });
    } else {
      // Fallback
      return NextResponse.json({ url: `/${resolvedParams.page}-bg.png` });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch banner" }, { status: 500 });
  }
}
