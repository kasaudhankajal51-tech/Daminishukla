import { getDb } from "@/lib/mongodb";
import { AstroClientPage } from "./AstroClientPage";

export const revalidate = 0; // Disable caching to always get fresh banner

export default async function AstroPage() {
  let bannerUrl = "/astrologer-bg.png";
  
  try {
    const db = await getDb();
    const banner = await db.collection("banners").findOne({ page: "astrologer" });
    if (banner?.image_url) {
      bannerUrl = banner.image_url;
    }
  } catch (error) {
    console.error("Failed to fetch banner:", error);
  }

  return <AstroClientPage bannerUrl={bannerUrl} />;
}
