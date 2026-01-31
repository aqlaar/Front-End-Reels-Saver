import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex w-full justify-center bg-white border-b border-solid border-b-[#f4f0f3]">
      <div className="flex flex-col w-full max-w-300">
        <header className="flex items-center justify-between whitespace-nowrap px-10 py-3">
          <Link href="/" className="flex items-center gap-4 text-primary">
            <div className="size-8">
              <span className="material-symbols-outlined text-4xl">movie_edit</span>
            </div>
            <h2 className="text-[#181116] text-xl font-bold leading-tight tracking-[-0.015em]">
              ReelsSave by aqlaar.
            </h2>
          </Link>
          <div className="flex flex-1 justify-end gap-8 items-center">
            <div className="hidden md:flex items-center gap-9">
              <Link href="#how-it-works" className="text-[#181116] text-sm font-bold hover:text-primary transition-colors">How it Works</Link>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}