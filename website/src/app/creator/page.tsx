import { getDb } from "@/lib/mongodb";
import { CreatorClientPage } from "./CreatorClientPage";

export const revalidate = 0; // Disable caching to always get fresh banner

export default async function CreatorPage() {
  let bannerUrl = "/creator-bg.png";
  
  try {
    const db = await getDb();
    const banner = await db.collection("banners").findOne({ page: "creator" });
    if (banner?.image_url) {
      bannerUrl = banner.image_url;
    }
  } catch (error) {
    console.error("Failed to fetch banner:", error);
  }

  return <CreatorClientPage bannerUrl={bannerUrl} />;
}
