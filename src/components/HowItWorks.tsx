export default function HowItWorks() {
  const steps = [
    {
      icon: "content_copy",
      title: "Copy Link",
      desc: "Open Instagram, find the Reel you want to save, and copy its link from the menu.",
    },
    {
      icon: "content_paste",
      title: "Paste & Fetch",
      desc: "Paste the link into the search box at the top and click the 'Fetch Video' button.",
    },
    {
      icon: "cloud_download",
      title: "Download",
      desc: "Review the metadata and click the download button to save the video to your device.",
    },
  ];

  return (
    <div id="how-it-works" className="w-full flex justify-center py-16 bg-white mt-10">
      <div className="flex flex-col w-full max-w-240 flex-1 px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#181116] text-3xl font-black leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            How it works
          </h2>
          <p className="text-[#89617c] text-lg">Download any Reels in 3 simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-4 group">
              <div className="size-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl font-bold">{step.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-[#181116]">{step.title}</h3>
              <p className="text-[#89617c] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}