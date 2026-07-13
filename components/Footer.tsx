import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600">
                <svg
                  className="h-3.5 w-3.5 text-white"
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
              <span className="font-bold text-white">DeskDeflect</span>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Your admin firewall. Forward admin tasks, stay in deep work.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/demo"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  Developer Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Built by</h3>
            <p className="mt-3 text-sm text-slate-500">
              Idea Miner — automated research pipeline that mines real pain
              points and ships working mocks.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} DeskDeflect. Mock demo — not a live
          product.
        </div>
      </div>
    </footer>
  );
}
