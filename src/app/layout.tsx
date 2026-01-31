import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reels Downloader - Instant Video Save",
  description: "Download Instagram Reels instantly without watermarks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light bg-white">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&family=Noto+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light font-display antialiased">
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
