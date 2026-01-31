"use client";

import { useState, useRef } from "react";

export default function ResultCard({
  data,
  onReset,
}: {
  data: any;
  onReset: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  // --- 1. ROBUST DATA EXTRACTION ---
  // Helper to find download_url recursively or check specific paths
  const extractVideoData = (input: any) => {
    // Check for normalized server action response
    if (input?.videoUrl) return input;

    // Check known paths ordered by likelihood based on user context
    if (input?.data?.data?.download_url) return input.data.data;
    if (input?.data?.download_url) return input.data;
    if (input?.download_url) return input;

    return null;
  };

  const videoData = extractVideoData(data);
  const videoSrc = videoData?.download_url || videoData?.videoUrl;

  // Extract author name and caption safely
  const rawAuthor = videoData?.author || "Instagram User";

  // Parse "Name on Instagram: "Caption"" format
  // Example: "User on Instagram: "My Caption""
  const parts = rawAuthor.split(' on Instagram: "');
  const authorName = parts[0].replace(/\n/g, " ").trim();

  // If caption exists in the author string, use it. Otherwise fall back to data.caption
  // Remove the trailing quote if it exists
  let displayCaption = videoData.caption;
  if (parts.length > 1) {
    displayCaption = parts[1].replace(/"$/, "");
  }

  // --- 2. CORS-SAFE DOWNLOAD HANDLER ---
  const handleDownload = async () => {
    if (!videoSrc) return;

    setIsDownloading(true);
    setDownloadError("");

    try {
      // Step A: Try direct fetch -> blob (Best UX, avoids new tab if possible)
      // Note: This often fails with Instagram CDN due to CORS, but we try it first.
      const response = await fetch(videoSrc);
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create temporary link and click it
      const a = document.createElement("a");
      a.href = url;
      // Generate filename from author and date or generic name
      const safeAuthor = authorName
        .substring(0, 15)
        .replace(/[^a-z0-9]/gi, "_");
      a.download = `reel-${safeAuthor}-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.warn("Direct download failed, falling back to new tab.", error);

      // Step B: Fallback - Open in new tab
      // This allows the browser to handle the file, or user can right-click > Save As
      const newWindow = window.open(videoSrc, "_blank");

      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed == "undefined"
      ) {
        setDownloadError("Pop-up blocked. Please allow pop-ups to download.");
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // --- 3. SAFETY CHECK UI ---
  if (!videoSrc) {
    return (
      <div className="w-full flex justify-center py-5">
        <div className="w-full max-w-240 px-4">
          <div className="p-6 text-center border-2 border-red-100 rounded-xl bg-red-50 flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-red-400">
              error
            </span>
            <p className="text-red-700 font-bold text-lg">
              Unable to extract video
            </p>
            <p className="text-sm text-red-500 max-w-md mx-auto">
              The API response didn't contain a recognizable download link.
            </p>
            <button
              onClick={onReset}
              className="mt-2 px-6 py-2 bg-white border border-red-200 text-red-600 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Try Another Relay
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 4. RENDER UI ---
  return (
    <div className="w-full flex justify-center py-8 fade-in-up">
      <div className="flex flex-col w-full max-w-240 flex-1 px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between px-2 pb-4 mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500 fill-1 text-2xl">
              check_circle
            </span>
            <h2 className="text-[#181116] text-2xl font-bold tracking-tight">
              Video Ready
            </h2>
          </div>
          <button
            onClick={onReset}
            className="group flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5"
          >
            <span>Clear result</span>
            <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">
              close
            </span>
          </button>
        </div>

        {/* Main Content Card */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100">
          {/* Video Preview Column */}
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <div className="relative aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-inner group">
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-contain bg-[#1a1a1a]"
                playsInline
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={handleVideoPlay}
              />

              {/* Custom Play/Pause Overlay */}
              <div
                className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 pointer-events-none
                ${isPlaying ? "opacity-0" : "opacity-100"}`}
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-4xl fill-1 ml-1">
                    play_arrow
                  </span>
                </div>
              </div>

              {/* Video controls Hint */}
              {isPlaying && (
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Click to pause
                </div>
              )}
            </div>
          </div>

          {/* Details & Actions Column */}
          <div className="flex flex-1 flex-col justify-between py-2">
            <div className="space-y-6">
              {/* Author Info */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {/* Placeholder avatar since API might not give one */}
                      <span className="material-symbols-outlined text-gray-400 text-2xl">
                        person
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="text-xl font-bold text-gray-900 truncate"
                    title={authorName}
                  >
                    {authorName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                    <span className="material-symbols-outlined text-sm text-pink-500">
                      smart_display
                    </span>
                    <p className="text-sm font-medium">Instagram Reel</p>
                  </div>
                </div>
              </div>

              {/* Caption Box */}
              <div className="relative">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <span className="material-symbols-outlined absolute top-4 right-4 text-gray-300 transform scale-x-[-1]">
                    format_quote
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed pr-6 line-clamp-4">
                    {displayCaption || (
                      <span className="italic text-gray-400">
                        No caption available
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`
                  relative w-full flex items-center justify-center h-16 rounded-2xl text-lg font-bold text-white shadow-lg transition-all transform active:scale-[0.98]
                  ${
                    isDownloading
                      ? "bg-gray-400 cursor-wait"
                      : "bg-primary hover:brightness-110 hover:shadow-primary/30"
                  }
                `}
              >
                {isDownloading ? (
                  <div className="flex items-center gap-3">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing download...</span>
                  </div>
                ) : (
                  <div className="flex cursor-pointer items-center gap-3">
                    <span className="material-symbols-outlined text-black text-2xl">
                      download
                    </span>
                    <span className="text-black">Download MP4</span>
                  </div>
                )}
              </button>

              {downloadError && (
                <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded-lg">
                  {downloadError}
                </p>
              )}

              {videoData.audio_url && (
                <a
                  href={videoData.audio_url}
                  className="flex w-full items-center justify-center h-14 rounded-2xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined">music_note</span>
                  <span>Audio Only</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
