import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getDb } from "@/lib/mongodb";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function POST(req: Request, { params }: { params: Promise<{ page: string }> }) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await params;
  const page = resolvedParams.page;
  if (page !== "creator" && page !== "astrologer") {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.name);
    const filename = `${page}-${Date.now()}${ext}`;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;

    // Update database using MongoDB native driver
    const db = await getDb();
    await db.collection("banners").updateOne(
      { page },
      { $set: { page, image_url: imageUrl, updated_at: new Date() } },
      { upsert: true }
    );

    // Force Next.js to revalidate the frontend cache for production
    revalidatePath(`/${page}`);
    revalidatePath("/");

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error("Banner Upload Error:", error);
    return NextResponse.json({ error: "Failed to upload banner" }, { status: 500 });
  }
}
