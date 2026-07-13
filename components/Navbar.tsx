import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-surface-900/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-white">DeskDeflect</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Pricing
          </Link>
          <Link
            href="/demo"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Live Demo
          </Link>
          <Link
            href="/developers"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            Developers
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/demo" className="btn-primary text-sm">
            Try Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
