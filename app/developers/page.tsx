import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Documentation — DeskDeflect",
  description:
    "Feature documentation for the DeskDeflect demo: what's mocked, what's real in production, and intended data flows.",
};

const features = [
  {
    name: "Unified Async Inbox",
    demoPath: "/demo → Async Inbox tab",
    tryIt:
      "Click any row in the inbox table to view details. Use search and classification filters. Click '+ Forward Task' to add a new item.",
    mocked:
      "12 hardcoded inbox items with realistic data. Forward modal adds client-side items. No Gmail/Outlook webhooks.",
    production:
      "Gmail Pub/Sub push notifications and Microsoft Graph webhooks ingest emails in real-time. Users also forward to inbox@deskdeflect.com. Messages stored in Supabase with full-text search via pg_trgm.",
    dataFlow:
      "Email arrives → webhook handler (Vercel serverless) → queue to classification pipeline → store in inbox_items table → push to client via Supabase Realtime (only during digest window, not during focus mode).",
  },
  {
    name: "AI Classification & Drafts",
    demoPath: "/demo → Async Inbox tab → select any item",
    tryIt:
      "Click inbox rows to see classification badges (auto-handle, draft-and-confirm, escalate) and AI-generated draft responses. Approve, edit, or archive items.",
    mocked:
      "Pre-assigned classifications and static draft text. Approve/archive updates local React state only.",
    production:
      "OpenAI GPT-4o with structured output (JSON schema) classifies each message. System prompt includes user preferences, past responses (RAG from vector store), and company context. Temperature 0.3 for consistency.",
    dataFlow:
      "New message → GPT-4o classify (auto-handle | draft-and-confirm | escalate) → if auto-handle: generate response + send via Gmail API + archive → if draft: store draft in DB → if escalate: flag + notify in digest only.",
  },
  {
    name: "Calendar Scheduling Rules",
    demoPath: "/demo → Calendar Rules tab",
    tryIt:
      "View active natural-language rules. Add new rules via modal. Confirm or decline proposed calendar events.",
    mocked:
      "6 calendar events and 6 scheduling rules as static data. Add/remove rules updates local state.",
    production:
      "Rules stored as parsed JSON constraints (earliestStart, latestEnd, bufferMinutes, maxPerDay, blockedDays). LLM parses natural language to structured rules on save. Google Calendar API free/busy checks before proposing times.",
    dataFlow:
      "Scheduling email detected → extract proposed times → check against rules + Calendar API → auto-accept valid slot / counter-propose alternative / queue for digest if ambiguous.",
  },
  {
    name: "Daily Digest",
    demoPath: "/demo → Daily Digest tab",
    tryIt:
      "Review 7 digest items. Approve or skip each decision item. Click 'Complete Digest' when all reviewed.",
    mocked:
      "Static digest items with approve/skip updating local state. Progress bar tracks completion.",
    production:
      "Cron job at 7 PM user timezone compiles digest: summary of auto-handled items + queue of draft-and-confirm items. Sent via email and available in-app. User has 24h to approve; unapproved items auto-escalate.",
    dataFlow:
      "7 PM cron → query handled + pending items → generate summary (GPT-4o) → send digest email → user approves in app → trigger Gmail send for approved drafts.",
  },
  {
    name: "Integrations (Gmail, Outlook, Slack, Calendly)",
    demoPath: "/demo → Integrations tab",
    tryIt:
      "Click integration cards to view details. Toggle connect/disconnect. Click 'Force Sync Now' on detail panel.",
    mocked:
      "6 integrations with connect toggles and sync counts. No OAuth flows.",
    production:
      "OAuth2 for Gmail (Google), Outlook (Microsoft), Slack (Events API + slash commands), Google Calendar. Calendly-style scheduling via internal link generator. Stripe for billing webhooks.",
    dataFlow:
      "User connects via OAuth → store refresh token (encrypted) → webhook subscriptions created → incoming events routed to classification pipeline. Disconnect revokes tokens and removes webhooks.",
  },
  {
    name: "Focus Mode",
    demoPath: "/demo → top bar → Focus Mode toggle",
    tryIt:
      "Toggle Focus Mode on/off. Toast confirms state change.",
    mocked:
      "Visual toggle with toast notification. No actual notification blocking.",
    production:
      "Sets user status to 'deep work' in DB. Suppresses all real-time notifications. Items still ingested and classified but held until focus window ends or user disables. Integrates with OS DND via browser extension.",
    dataFlow:
      "Toggle → update user_preferences.focus_mode → classification pipeline continues → notifications suppressed → items queue for next digest or focus-end summary.",
  },
  {
    name: "Analytics Dashboard",
    demoPath: "/demo → Analytics tab",
    tryIt:
      "View stat cards, classification breakdown chart, and activity feed. Switch between 7d/30d/90d ranges.",
    mocked:
      "Static weekly stats, chart data, and activity feed. Range buttons show toast only.",
    production:
      "Daily aggregation cron computes metrics from classification_logs table. Chart data served via API route. Optional PostHog for product analytics.",
    dataFlow:
      "Each classification event → log to classification_logs → nightly aggregation → metrics table → served to dashboard API.",
  },
  {
    name: "Activity Feed",
    demoPath: "/demo → sidebar (desktop) or Analytics tab",
    tryIt:
      "Scroll the live activity feed in the sidebar on desktop views.",
    mocked:
      "10 static activity events with type-coded dots.",
    production:
      "Real-time activity stream from classification pipeline events via Supabase Realtime subscription. Filtered by user_id.",
    dataFlow:
      "Pipeline action → insert activity_event → Supabase Realtime broadcast → client updates feed.",
  },
];

export default function DevelopersPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-brand-400 transition hover:text-brand-300"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-white">
            Developer Documentation
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Every feature in the interactive demo, what&apos;s mocked vs.
            production, and where to click to try it.
          </p>
        </div>

        <div className="mb-8 glass-card p-6">
          <h2 className="text-lg font-semibold text-white">Quick start</h2>
          <p className="mt-2 text-sm text-slate-400">
            Open the{" "}
            <Link href="/demo" className="text-brand-400 hover:text-brand-300">
              interactive demo
            </Link>
            . Look for{" "}
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-600/20 text-[10px] font-bold text-brand-400">
              i
            </span>{" "}
            icons beside major controls — these are DEV NOTE tooltips explaining
            production behavior.
          </p>
          <div className="mt-4 rounded-lg bg-surface-700/50 p-4 font-mono text-xs text-slate-300">
            <div>Stack: Next.js 14 (App Router) · Tailwind CSS · TypeScript</div>
            <div>Deploy: Vercel zero-config · No env vars · No backend</div>
            <div>Data: lib/mock-data.ts (client-side hardcoded sample data)</div>
          </div>
        </div>

        <div className="space-y-6">
          {features.map((feature, idx) => (
            <article key={feature.name} className="glass-card p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/20 text-sm font-bold text-brand-400">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white">
                    {feature.name}
                  </h2>
                  <p className="mt-1 text-sm text-brand-400">{feature.demoPath}</p>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        How to try it
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {feature.tryIt}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        What&apos;s mocked
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {feature.mocked}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Production implementation
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {feature.production}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Data flow
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        {feature.dataFlow}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 glass-card p-6">
          <h2 className="text-lg font-semibold text-white">
            Architecture overview
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-surface-900 p-4 text-xs text-slate-400">
{`┌─────────────┐     webhook      ┌──────────────────┐
│ Gmail/Outlook│ ──────────────→ │ Classification    │
│ Slack        │                 │ Pipeline (GPT-4o) │
└─────────────┘                  └────────┬─────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
             ┌──────────┐         ┌──────────────┐       ┌──────────┐
             │Auto-handle│         │Draft-confirm │       │ Escalate │
             │+ respond  │         │→ digest queue│       │→ flag    │
             └──────────┘         └──────┬───────┘       └──────────┘
                                         │
                                         ▼ 7pm cron
                                  ┌──────────────┐
                                  │ Daily Digest  │
                                  │ (5-min review)│
                                  └──────────────┘`}
          </pre>
        </div>

        <div className="mt-8 text-center">
          <Link href="/demo" className="btn-primary">
            Open Interactive Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
