import Link from "next/link";

const features = [
  {
    title: "Unified Async Inbox",
    description:
      "Forward any admin email or task here. DeskDeflect handles it while you stay in flow — no live interruptions.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "AI Classification & Drafts",
    description:
      "GPT-4o categorizes every item as auto-handle, draft-and-confirm, or escalate. Only real decisions reach you.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Smart Calendar Rules",
    description:
      "Natural language scheduling: 'never before 10am, no back-to-backs.' AI resolves invites against your rules automatically.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "5-Minute Daily Digest",
    description:
      "Every evening, review what was handled and approve yes/no on drafts. That's your entire admin overhead.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Gmail, Outlook & Slack",
    description:
      "Webhook ingestion from email providers and Slack. Calendly-style scheduling links generated automatically.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
  {
    title: "Admin Firewall",
    description:
      "Not another todo app. DeskDeflect removes tasks from your plate entirely — a filter, not an organizer.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-surface-900 to-surface-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-600/30 bg-brand-600/10 px-4 py-1.5 text-sm text-brand-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Your admin EA, not another todo app
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Stop breaking{" "}
              <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                deep work
              </span>{" "}
              for admin tasks
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              DeskDeflect is an async inbox that handles appointment scheduling,
              expense submissions, vendor emails, and admin overhead — so you
              never context-switch out of code.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                Try Interactive Demo
              </Link>
              <Link href="/research" className="btn-secondary px-8 py-3 text-base">
                How we found this idea
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              156 tasks handled this week · 4.2 hours saved · 0 interruptions
            </p>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-slate-800 bg-surface-800/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-4 py-6 sm:px-6 lg:px-8">
          {["Vercel", "Stripe", "Acme Corp", "Horizon Ventures", "Bay Area Medical"].map(
            (name) => (
              <span key={name} className="text-sm font-medium text-slate-600">
                {name}
              </span>
            )
          )}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Everything handled. You decide.</h2>
            <p className="section-subheading mx-auto">
              Forward admin tasks to DeskDeflect. AI classifies, drafts, and
              schedules. You get a 5-minute daily digest — that&apos;s it.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="glass-card group p-6 transition hover:border-brand-600/30 hover:bg-surface-700/50"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600/20 text-brand-400 transition group-hover:bg-brand-600/30">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-800 bg-surface-800/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Three layers of defense</h2>
            <p className="section-subheading mx-auto">
              Most admin never reaches you. What does, arrives pre-drafted.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Auto-handle",
                desc: "Spam, newsletters, receipts, acknowledgments — responded and archived instantly. 63% of your admin vanishes.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                step: "02",
                title: "Draft & confirm",
                desc: "Vendor emails, scheduling requests, expense reports — AI drafts a response. You approve in the daily digest.",
                color: "text-brand-400",
                bg: "bg-brand-600/10",
              },
              {
                step: "03",
                title: "Escalate",
                desc: "Only true decisions — deploy approvals, contract terms, HR deadlines — flagged for your yes/no.",
                color: "text-amber-400",
                bg: "bg-amber-500/10",
              },
            ].map((item) => (
              <div key={item.step} className="glass-card p-8">
                <div
                  className={`inline-flex rounded-lg ${item.bg} px-3 py-1 text-sm font-bold ${item.color}`}
                >
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Simple pricing</h2>
            <p className="section-subheading mx-auto">
              Less than one hour of your billable rate. Pays for itself the
              first week.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="glass-card p-8">
              <h3 className="text-lg font-semibold text-white">Individual</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$19</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Per seat, billed monthly</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Unified async inbox
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> AI classification & drafts
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Calendar scheduling rules
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Daily digest
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Gmail & Outlook integration
                </li>
              </ul>
              <Link href="/demo" className="btn-secondary mt-8 w-full">
                Start with demo
              </Link>
            </div>
            <div className="glass-card relative border-brand-600/50 p-8">
              <div className="absolute -top-3 right-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                Popular
              </div>
              <h3 className="text-lg font-semibold text-white">Team</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Up to 3 seats</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Everything in Individual
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Slack integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Shared scheduling rules
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Team activity dashboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Priority AI support agent
                </li>
              </ul>
              <Link href="/demo" className="btn-primary mt-8 w-full">
                Start with demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-gradient-to-b from-surface-800/50 to-surface-900 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            See it handle your admin — in 2 minutes
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            The interactive demo is fully populated with realistic data. Every
            button works. No signup required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/demo" className="btn-primary px-8 py-3 text-base">
              Open Live Demo
            </Link>
            <Link href="/developers" className="btn-secondary px-8 py-3 text-base">
              Read Developer Docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
