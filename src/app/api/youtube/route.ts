import { NextResponse } from "next/server";

// Helper to format ISO 8601 duration (e.g., PT1H2M10S) to MM:SS
function formatDuration(isoDuration: string) {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "0:00";
  
  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;
  
  let formatted = "";
  if (hours > 0) formatted += `${hours}:`;
  formatted += `${hours > 0 ? minutes.toString().padStart(2, '0') : minutes}:${seconds.toString().padStart(2, '0')}`;
  return formatted;
}

// Helper to format large numbers (e.g., 1500 -> 1.5K)
function formatViews(viewCount: string) {
  const views = parseInt(viewCount);
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M views";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K views";
  return views + " views";
}

export async function GET() {
  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || "UC..."; 

    if (!API_KEY) {
      // Mock data...
      return NextResponse.json({
        success: true,
        mock: true,
        data: []
      });
    }

    // Step 1: Get the 'uploads' playlist ID for the channel
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&id=${CHANNEL_ID}&part=contentDetails`;
    const channelRes = await fetch(channelUrl, { cache: 'no-store' });
    const channelData = await channelRes.json();

    if (!channelRes.ok || !channelData.items || channelData.items.length === 0) {
      console.error("YouTube Channel API Error:", channelData);
      return NextResponse.json({ success: false, error: "Failed to fetch channel details" }, { status: 500 });
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Step 2: Fetch the latest 3 videos from the uploads playlist
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${uploadsPlaylistId}&part=snippet&maxResults=3`;
    const playlistRes = await fetch(playlistUrl, { cache: 'no-store' });
    const playlistData = await playlistRes.json();

    if (!playlistRes.ok || !playlistData.items) {
      return NextResponse.json({ success: false, error: "Failed to fetch playlist items" }, { status: 500 });
    }

    const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(",");

    if (!videoIds) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Step 3: Fetch video details (duration, views)
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`;
    const videosRes = await fetch(videosUrl, { cache: 'no-store' });
    const videosData = await videosRes.json();

    if (!videosRes.ok) {
      return NextResponse.json({ success: false, error: "Failed to fetch video details" }, { status: 500 });
    }

    const videos = videosData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      duration: formatDuration(item.contentDetails.duration),
      views: formatViews(item.statistics.viewCount),
      publishedAt: item.snippet.publishedAt,
    }));

    return NextResponse.json({ success: true, mock: false, data: videos });

  } catch (error) {
    console.error("YouTube Route Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
