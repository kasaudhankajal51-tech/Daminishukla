import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
    const ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || "me"; // "me" defaults to the user associated with the token

    if (!ACCESS_TOKEN) {
      // Return mock data if no token is provided to prevent breaking the UI
      return NextResponse.json({
        success: true,
        mock: true,
        data: []
      });
    }

    // Fetch the latest media from the Instagram Basic Display API or Graph API
    // We'll use the Graph API endpoint for Instagram accounts linked to Facebook Pages
    // Or the Basic Display API endpoint if it's a personal account.
    // Assuming standard Graph API structure:
    const url = `https://graph.instagram.com/v21.0/${ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=3&access_token=${ACCESS_TOKEN}`;
    
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();

    if (!res.ok || data.error) {
      console.error("Instagram API Error:", data.error || data);
      return NextResponse.json({ success: false, error: "Failed to fetch Instagram posts" }, { status: 500 });
    }

    if (!data.data) {
       return NextResponse.json({ success: true, data: [] });
    }

    const posts = data.data.map((item: any) => ({
      id: item.id,
      caption: item.caption || "",
      mediaType: item.media_type,
      mediaUrl: item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
      permalink: item.permalink,
      timestamp: item.timestamp,
    }));

    return NextResponse.json({ success: true, mock: false, data: posts });

  } catch (error) {
    console.error("Instagram Route Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
