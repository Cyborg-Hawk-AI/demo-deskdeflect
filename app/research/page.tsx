import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How We Found This Idea — DeskDeflect",
  description:
    "Research origin story, validation results, and source pain points behind DeskDeflect.",
};

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: false },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

export default function ResearchPage() {
  return (
    <div className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-brand-400 transition hover:text-brand-300"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-white">
            How we found this idea
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            DeskDeflect was discovered through automated research mining real
            developer pain points — not brainstormed in a vacuum.
          </p>
        </div>

        {/* Origin story */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white">
            The research: why this exists
          </h2>
          <div className="mt-4 glass-card p-6">
            <p className="leading-relaxed text-slate-300">
              A Hacker News thread on AI life management surfaces a comment that
              crystallizes the pain perfectly:{" "}
              <em className="text-white">
                &ldquo;I&apos;d pay for something to deal with that&rdquo;
              </em>{" "}
              — referring specifically to the mental overhead of managing
              appointments, vendor emails, and admin tasks while trying to code.
              The commenter describes context switching as the real productivity
              killer, not the tasks themselves. Existing tools like Superhuman
              make email faster but don&apos;t remove it; Reclaim handles
              calendar but not the inbox. The gap is a product that acts as a
              filter, not an organizer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-brand-600/20 px-3 py-1 text-xs font-medium text-brand-400">
                Cluster: Context switching & admin interruption
              </span>
              <span className="rounded-full bg-surface-600 px-3 py-1 text-xs font-medium text-slate-300">
                Rubric score: 102/130
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
                Validation: 8/9 checks passed
              </span>
            </div>
          </div>
        </section>

        {/* Competitive landscape */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white">
            Competitive landscape
          </h2>
          <div className="mt-4 glass-card p-6">
            <p className="leading-relaxed text-slate-300">
              <strong className="text-white">Superhuman</strong> — email speed,
              not delegation.{" "}
              <strong className="text-white">Reclaim.ai</strong> — calendar
              only. <strong className="text-white">Clara</strong> —
              human-assisted, expensive. No async AI delegation inbox
              specifically for developer/knowledge worker admin overhead at this
              price point.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              <strong className="text-slate-300">Go-to-market:</strong> Hacker
              News Show HN launch, r/productivity, developer Twitter/X — lead
              with the framing &ldquo;your admin EA, not another todo app&rdquo;
            </p>
          </div>
        </section>

        {/* Automation playbook */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white">
            How this business runs itself
          </h2>
          <p className="mt-2 text-slate-400">
            The goal is passive, low-maintenance recurring revenue.
          </p>
          <div className="mt-4 glass-card p-6">
            <p className="leading-relaxed text-slate-300">
              Gmail/Outlook webhook pushes every incoming email to the
              classification pipeline instantly. OpenAI GPT-4o categorizes as
              &lsquo;auto-handle,&rsquo; &lsquo;draft-and-confirm,&rsquo; or
              &lsquo;escalate.&rsquo; Auto-handle items (spam, newsletters,
              vendor acknowledgments) are responded to and archived with no
              human touch. Draft-and-confirm items queue for the daily digest.
              Calendar invites resolved against stored scheduling rules via
              Google Calendar API. Stripe manages subscriptions with zero
              manual billing. AI support agent handles onboarding questions.
              Owner time: ~1 hour/week reviewing edge-case escalations.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-surface-700/50 p-4">
                <div className="text-xs text-slate-500">Estimated owner time</div>
                <div className="mt-1 text-lg font-semibold text-white">
                  ~1 hour/week
                </div>
              </div>
              <div className="rounded-lg bg-surface-700/50 p-4">
                <div className="text-xs text-slate-500">MVP estimate</div>
                <div className="mt-1 text-sm text-slate-300">
                  Next.js + Supabase + OpenAI + Gmail API + Google Calendar API;
                  3.5 weeks solo dev
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Validation checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white">
            Validation checklist (8/9)
          </h2>
          <div className="mt-4 glass-card p-6">
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                      item.passed
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-700 text-slate-500"
                    }`}
                  >
                    {item.passed ? "✓" : "—"}
                  </span>
                  <span
                    className={
                      item.passed ? "text-slate-300" : "text-slate-500"
                    }
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Source pain points */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white">
            Source pain points (real posts)
          </h2>
          <div className="mt-4 space-y-4">
            <div className="glass-card p-6">
              <h3 className="font-semibold text-white">
                Context switching kills deep work
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Knowledge workers struggle with context switching and mental
                overhead from managing multiple tasks like coding, emails, and
                administrative appointments, losing focus on primary work.
              </p>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-slate-500">Persona</dt>
                  <dd className="text-slate-300">
                    Software developers, knowledge workers
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Workaround</dt>
                  <dd className="text-slate-300">
                    Manual task management, context switching
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Frequency</dt>
                  <dd className="text-slate-300">Daily</dd>
                </div>
                <div>
                  <dt className="text-slate-500">WTP signal</dt>
                  <dd className="text-emerald-400">
                    &ldquo;I&apos;d pay for something to deal with that&rdquo;
                  </dd>
                </div>
              </dl>
              <a
                href="https://news.ycombinator.com/item?id=48885443"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400 transition hover:text-brand-300"
              >
                View on Hacker News →
              </a>
            </div>
          </div>
        </section>

        {/* About Idea Miner */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white">About this program</h2>
          <div className="mt-4 glass-card p-6">
            <p className="leading-relaxed text-slate-300">
              This demo was auto-built by the{" "}
              <strong className="text-white">Idea Miner</strong> pipeline: a
              twice-daily research program that mines Reddit, Hacker News, Stack
              Exchange, and GitHub for real people describing real pain, scores
              the opportunities, and automatically ships a working mock of every
              idea that passes validation (&gt;=8/9 checks, momentum not
              declining, not previously built). The bar for every idea:
              low-maintenance recurring revenue that a solo owner can run in a
              few hours a week.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Generated by Idea Miner run 2026-07-12-pm on 2026-07-13 00:22 UTC
            </p>
          </div>
        </section>

        <div className="text-center">
          <Link href="/demo" className="btn-primary">
            Try the Interactive Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
