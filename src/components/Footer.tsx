export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center border-t border-[#f4f0f3] py-10 bg-white">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-240 px-8 gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">movie_edit</span>
            <span className="text-xl font-bold text-[#181116]">ReelsSave by aqlaar. </span>
          </div>
          <p className="text-[#89617c] text-sm max-w-70">
            The fastest and safest way to save your favorite Instagram content forever.
          </p>
        </div>
      </div>
      <div className="mt-12 text-[#89617c] text-xs">
        © {new Date().getFullYear()} ReelsSave Downloader. Not affiliated with Instagram or Meta.
      </div>
    </footer>
  );
}