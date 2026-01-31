"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ResultCard from "../components/ResultCard";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { useState } from "react";
import { downloadReel, ReelData } from "./actions";

export default function Home() {
  const [data, setData] = useState<ReelData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async (url: string) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const result = await downloadReel(url);
      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError("");
  };

  return (
    <main className="flex flex-1 flex-col items-center min-h-screen">
      <Navbar />
      <HeroSection onSubmit={handleDownload} isLoading={loading} />

      {error && (
        <div className="w-full max-w-240 px-4 py-4">
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
            {error}
          </div>
        </div>
      )}

      {data && <ResultCard data={data} onReset={handleReset} />}

      <HowItWorks />
      <Footer />
    </main>
  );
}
