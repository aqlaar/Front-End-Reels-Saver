"use client";

import { useState } from "react";

export default function HeroSection({
  onSubmit,
  isLoading,
}: {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}) {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <div className="flex flex-col w-full max-w-240 flex-1 px-4">
        <div className="@container">
          <div className="@[480px]:p-4">
            <div
              className="flex min-h-105 flex-col gap-8 bg-cover bg-center bg-no-repeat @[480px]:rounded-3xl items-center justify-center p-8 relative overflow-hidden"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, rgba(236, 19, 164, 0.8) 0%, rgba(34, 16, 28, 0.9) 100%), url("https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop")',
              }}
            >
              <div className="flex flex-col gap-4 text-center z-10">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl">
                  Instagram Reels Downloader
                </h1>
                <h2 className="text-white/90 text-base font-normal leading-normal @[480px]:text-xl max-w-2xl mx-auto">
                  High-quality video downloads in seconds. No watermarks, no
                  registration, just pure speed.
                </h2>
              </div>
              <div className="flex flex-col min-w-40 h-16 w-full max-w-150 z-10 shadow-2xl">
                <div className="flex w-full flex-1 items-stretch rounded-2xl h-full bg-white p-1.5 overflow-hidden">
                  <div className="text-[#89617c] flex items-center justify-center pl-4 pr-2">
                    <span className="material-symbols-outlined">link</span>
                  </div>
                  <input
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#181116] focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#89617c] px-2 text-base font-normal"
                    placeholder="Paste Instagram Reel URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex min-w-30 cursor-pointer items-center justify-center overflow-hidden rounded-xl h-full px-6 bg-primary text-black text-base font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">
                      {isLoading ? "  Loading..." : "Download"}
                    </span>
                  </button>
                </div>
              </div>
              <p className="text-white/60 text-xs mt-2 z-10">
                By using our service you accept our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
