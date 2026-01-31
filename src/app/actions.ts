"use server";

export interface ReelData {
  videoUrl?: string;
  audioUrl?: string;
  thumbnailUrl?: string;
  author?: string;
  caption?: string;
  likes?: string;
  plays?: string;
  error?: string;
}

export async function downloadReel(url: string): Promise<ReelData> {
  try {
    const response = await fetch("https://back-end-reels-saver.vercel.app/api/download-reel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      console.error("API Error Status:", response.status);
      const text = await response.text();
      console.error("API Error Text:", text);
      return { error: `Failed to fetch reel: ${response.statusText}` };
    }

    const data = await response.json();
    console.log("API Response:", JSON.stringify(data, null, 2));

    // Helper to find the deepest object that has download_url
    const findMediaData = (obj: any): any => {
      if (!obj) return null;
      if (obj.download_url) return obj;
      if (obj.data) return findMediaData(obj.data);
      if (obj.items && obj.items[0]) return findMediaData(obj.items[0]);
      return null;
    };

    const mediaData = findMediaData(data) || {};

    return {
      videoUrl: mediaData.download_url || mediaData.video_url || data.url,
      audioUrl: mediaData.audio_url || mediaData.music_url,
      thumbnailUrl: mediaData.thumbnail_url || mediaData.cover_url || mediaData.poster,
      author: mediaData.author || mediaData.username || mediaData.owner?.username,
      caption: mediaData.caption || mediaData.title || mediaData.description,
    };
  } catch (error) {
    console.error("Download Action Error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
