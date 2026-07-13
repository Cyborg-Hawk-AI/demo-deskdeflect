"use client";

import { useState, useCallback } from "react";
import DevNote from "@/components/DevNote";
import Toast from "@/components/Toast";
import {
  inboxItems as initialInbox,
  activityFeed,
  digestItems as initialDigest,
  calendarEvents as initialCalendar,
  schedulingRules as initialRules,
  integrations as initialIntegrations,
  weeklyStats,
  chartData,
  type InboxItem,
  type Classification,
  type DigestItem,
  type CalendarEvent,
  type Integration,
} from "@/lib/mock-data";

type View = "inbox" | "digest" | "calendar" | "integrations" | "analytics";
type FilterClass = "all" | Classification;

const classificationColors: Record<Classification, string> = {
  "auto-handle": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "draft-and-confirm": "bg-brand-600/20 text-brand-400 border-brand-600/30",
  escalate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const classificationLabels: Record<Classification, string> = {
  "auto-handle": "Auto-handle",
  "draft-and-confirm": "Draft & confirm",
  escalate: "Escalate",
};

export default function DemoApp() {
  const [view, setView] = useState<View>("inbox");
  const [inbox, setInbox] = useState<InboxItem[]>(initialInbox);
  const [digest, setDigest] = useState<DigestItem[]>(initialDigest);
  const [calendar, setCalendar] = useState<CalendarEvent[]>(initialCalendar);
  const [integrations, setIntegrations] =
    useState<Integration[]>(initialIntegrations);
  const [rules, setRules] = useState<string[]>(initialRules);
  const [selectedItem, setSelectedItem] = useState<InboxItem | null>(null);
  const [filterClass, setFilterClass] = useState<FilterClass>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [focusMode, setFocusMode] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [newRule, setNewRule] = useState("");
  const [digestComplete, setDigestComplete] = useState(false);
  const [forwardSubject, setForwardSubject] = useState("");
  const [forwardDetails, setForwardDetails] = useState("");
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [analyticsRange, setAnalyticsRange] = useState<"7d" | "30d" | "90d">(
    "7d"
  );

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: "" });
  }, []);

  const filteredInbox = inbox.filter((item) => {
    const matchesClass =
      filterClass === "all" || item.classification === filterClass;
    const matchesSearch =
      searchQuery === "" ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleApproveDraft = (id: string) => {
    setInbox((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "handled" as const } : item
      )
    );
    setDigest((prev) =>
      prev.map((d) => (d.id === id ? { ...d, needsDecision: false } : d))
    );
    showToast("Draft approved and sent");
    setSelectedItem(null);
  };

  const handleRejectDraft = (id: string) => {
    setInbox((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, classification: "escalate" as const } : item
      )
    );
    showToast("Draft rejected — moved to escalate queue");
    setSelectedItem(null);
  };

  const handleArchive = (id: string) => {
    setInbox((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "archived" as const } : item
      )
    );
    showToast("Item archived");
    setSelectedItem(null);
  };

  const handleDigestApprove = (id: string) => {
    setDigest((prev) =>
      prev.map((d) => (d.id === id ? { ...d, needsDecision: false } : d))
    );
    showToast("Digest item approved");
  };

  const handleDigestReject = (id: string) => {
    setDigest((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, needsDecision: false, action: "Skipped — manual review" } : d
      )
    );
    showToast("Item skipped for manual review");
  };

  const handleCompleteDigest = () => {
    setDigestComplete(true);
    showToast("Daily digest complete! 4.2 hours saved today.");
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((int) =>
        int.id === id
          ? {
              ...int,
              connected: !int.connected,
              lastSync: !int.connected ? "Just now" : "—",
              itemsProcessed: !int.connected ? int.itemsProcessed : 0,
            }
          : int
      )
    );
    const integ = integrations.find((i) => i.id === id);
    showToast(
      integ?.connected
        ? `${integ.name} disconnected`
        : `${integ?.name} connected successfully`
    );
  };

  const handleConfirmCalendar = (id: string) => {
    setCalendar((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, status: "confirmed" as const } : ev
      )
    );
    showToast("Calendar event confirmed");
  };

  const handleDeclineCalendar = (id: string) => {
    setCalendar((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, status: "declined" as const } : ev
      )
    );
    showToast("Calendar event declined");
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setRules((prev) => [...prev, newRule.trim()]);
      setNewRule("");
      setShowRuleModal(false);
      showToast("Scheduling rule added");
    }
  };

  const handleRemoveRule = (index: number) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
    showToast("Rule removed");
  };

  const pendingDecisions = digest.filter((d) => d.needsDecision).length;

  const navItems: { id: View; label: string; badge?: number }[] = [
    { id: "inbox", label: "Async Inbox", badge: inbox.filter((i) => i.status === "pending" || i.status === "queued").length },
    { id: "digest", label: "Daily Digest", badge: pendingDecisions },
    { id: "calendar", label: "Calendar Rules" },
    { id: "integrations", label: "Integrations" },
    { id: "analytics", label: "Analytics" },
  ];

  const maxChart = Math.max(...chartData.map((d) => d.auto + d.draft + d.escalate));

  return (
    <div className="min-h-screen bg-surface-900">
      {/* Demo top bar */}
      <div className="border-b border-slate-800 bg-surface-800">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-white">DeskDeflect</h1>
            <span className="rounded-full bg-brand-600/20 px-2.5 py-0.5 text-xs font-medium text-brand-400">
              Demo Mode
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFocusMode(!focusMode);
                showToast(
                  focusMode
                    ? "Focus mode disabled — notifications on"
                    : "Focus mode ON — all admin blocked until 5 PM"
                );
              }}
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                focusMode
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-surface-700 text-slate-400 hover:text-white"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${focusMode ? "bg-emerald-400" : "bg-slate-500"}`}
              />
              Focus Mode
              <DevNote text="In production, Focus Mode blocks all real-time notifications and queues everything for the daily digest. Integrates with OS Do Not Disturb." />
            </button>
            <button
              onClick={() => setShowForwardModal(true)}
              className="btn-primary text-sm"
            >
              + Forward Task
              <DevNote text="Users forward emails to inbox@deskdeflect.com or use the browser extension. Gmail/Outlook webhooks push messages to the classification pipeline instantly." />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 border-r border-slate-800 p-4 lg:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  view === item.id
                    ? "bg-brand-600/20 text-brand-400"
                    : "text-slate-400 hover:bg-surface-700 hover:text-white"
                }`}
              >
                {item.label}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="rounded-full bg-brand-600 px-2 py-0.5 text-xs text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Activity feed sidebar */}
          <div className="mt-8">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Live Activity
            </h3>
            <div className="space-y-3">
              {activityFeed.slice(0, 6).map((event) => (
                <div key={event.id} className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-600">{event.time}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        event.type === "auto"
                          ? "bg-emerald-400"
                          : event.type === "draft"
                            ? "bg-brand-400"
                            : event.type === "calendar"
                              ? "bg-purple-400"
                              : event.type === "escalate"
                                ? "bg-amber-400"
                                : "bg-slate-400"
                      }`}
                    />
                  </div>
                  <p className="mt-0.5 text-slate-400">{event.action}</p>
                  <p className="text-slate-500">{event.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="flex w-full gap-1 overflow-x-auto border-b border-slate-800 p-2 lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-medium ${
                view === item.id
                  ? "bg-brand-600/20 text-brand-400"
                  : "text-slate-400"
              }`}
            >
              {item.label}
              {item.badge !== undefined && item.badge > 0 && ` (${item.badge})`}
            </button>
          ))}
        </div>

        {/* Main content */}
        <main className="min-h-[calc(100vh-120px)] flex-1 p-4 lg:p-6">
          {/* INBOX VIEW */}
          {view === "inbox" && (
            <div className="animate-fade-in">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Unified Async Inbox
                    <DevNote text="Central inbox aggregating forwarded emails, Gmail/Outlook webhooks, and Slack messages. Items arrive asynchronously — no live interruptions during deep work." />
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {filteredInbox.length} items ·{" "}
                    {inbox.filter((i) => i.status === "handled").length} handled
                    today
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search inbox..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-lg border border-slate-700 bg-surface-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-600 focus:outline-none"
                  />
                  {(["all", "auto-handle", "draft-and-confirm", "escalate"] as FilterClass[]).map(
                    (f) => (
                      <button
                        key={f}
                        onClick={() => setFilterClass(f)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                          filterClass === f
                            ? "bg-brand-600 text-white"
                            : "bg-surface-700 text-slate-400 hover:text-white"
                        }`}
                      >
                        {f === "all" ? "All" : classificationLabels[f as Classification]}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="glass-card overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-700/50 text-xs uppercase tracking-wider text-slate-500">
                          <th className="px-4 py-3">From</th>
                          <th className="px-4 py-3">Subject</th>
                          <th className="hidden px-4 py-3 sm:table-cell">Classification</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInbox.map((item) => (
                          <tr
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={`cursor-pointer border-b border-slate-800/50 transition hover:bg-surface-700/50 ${
                              selectedItem?.id === item.id ? "bg-surface-700/70" : ""
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="font-medium text-white">{item.from}</div>
                              <div className="text-xs text-slate-500">{item.company}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-slate-300">{item.subject}</div>
                              <div className="mt-0.5 truncate text-xs text-slate-500 max-w-xs">
                                {item.preview}
                              </div>
                            </td>
                            <td className="hidden px-4 py-3 sm:table-cell">
                              <span
                                className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${classificationColors[item.classification]}`}
                              >
                                {classificationLabels[item.classification]}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-xs font-medium ${
                                  item.status === "handled"
                                    ? "text-emerald-400"
                                    : item.status === "pending"
                                      ? "text-amber-400"
                                      : item.status === "queued"
                                        ? "text-brand-400"
                                        : "text-slate-500"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Detail panel */}
                <div className="glass-card p-5">
                  {selectedItem ? (
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-white">
                          {selectedItem.subject}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${classificationColors[selectedItem.classification]}`}
                        >
                          {classificationLabels[selectedItem.classification]}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        From {selectedItem.from} · {selectedItem.company} · via{" "}
                        {selectedItem.source}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {selectedItem.preview}
                      </p>
                      {selectedItem.amount && (
                        <p className="mt-2 text-sm font-medium text-white">
                          Amount: {selectedItem.amount}
                        </p>
                      )}
                      {selectedItem.aiDraft && (
                        <div className="mt-4 rounded-lg border border-brand-600/20 bg-brand-600/5 p-3">
                          <div className="mb-1 flex items-center text-xs font-semibold text-brand-400">
                            AI Draft
                            <DevNote text="GPT-4o generates contextual drafts based on email content, your past responses, and company tone. Draft-and-confirm items queue for daily digest approval." />
                          </div>
                          <p className="text-sm text-slate-300">
                            {selectedItem.aiDraft}
                          </p>
                        </div>
                      )}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {selectedItem.classification === "draft-and-confirm" && (
                          <>
                            <button
                              onClick={() => handleApproveDraft(selectedItem.id)}
                              className="btn-primary text-xs"
                            >
                              Approve & Send
                            </button>
                            <button
                              onClick={() => handleRejectDraft(selectedItem.id)}
                              className="btn-secondary text-xs"
                            >
                              Edit Draft
                            </button>
                          </>
                        )}
                        {selectedItem.classification === "escalate" && (
                          <button
                            onClick={() => {
                              handleApproveDraft(selectedItem.id);
                              showToast("Decision recorded — response sent");
                            }}
                            className="btn-primary text-xs"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleArchive(selectedItem.id)}
                          className="btn-secondary text-xs"
                        >
                          Archive
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {selectedItem.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-surface-600 px-2 py-0.5 text-xs text-slate-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-slate-500">
                      Select an item to view AI classification and draft
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* DIGEST VIEW */}
          {view === "digest" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                  Daily Digest
                  <DevNote text="Compiled at 7 PM by cron job. Summarizes all handled items and queues draft-and-confirm items for 5-minute yes/no review. This IS the product's core value — not overhead." />
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Sunday, July 13, 2026 · {pendingDecisions} decisions remaining ·
                  est. {Math.max(1, pendingDecisions)} min left
                </p>
              </div>

              {!digestComplete ? (
                <>
                  <div className="mb-6 glass-card p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Digest progress</span>
                      <span className="text-white">
                        {digest.filter((d) => !d.needsDecision).length} /{" "}
                        {digest.length} reviewed
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-600">
                      <div
                        className="h-full rounded-full bg-brand-600 transition-all"
                        style={{
                          width: `${(digest.filter((d) => !d.needsDecision).length / digest.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {digest.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`glass-card p-5 transition ${
                          item.needsDecision ? "border-brand-600/30" : "opacity-60"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full border px-2 py-0.5 text-xs ${classificationColors[item.classification]}`}
                              >
                                {classificationLabels[item.classification]}
                              </span>
                              {!item.needsDecision && (
                                <span className="text-xs text-emerald-400">✓ Reviewed</span>
                              )}
                            </div>
                            <h3 className="mt-2 font-semibold text-white">
                              {item.subject}
                            </h3>
                            <p className="text-sm text-slate-500">{item.from}</p>
                            <p className="mt-2 text-sm text-slate-400">
                              Action: {item.action}
                            </p>
                            <div className="mt-3 rounded-lg bg-surface-700/50 p-3 text-sm text-slate-300">
                              &ldquo;{item.draftPreview}&rdquo;
                            </div>
                          </div>
                          {item.needsDecision && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDigestApprove(item.id)}
                                className="btn-primary text-sm"
                              >
                                ✓ Approve
                              </button>
                              <button
                                onClick={() => handleDigestReject(item.id)}
                                className="btn-secondary text-sm"
                              >
                                Skip
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {pendingDecisions === 0 && (
                    <div className="mt-6 text-center">
                      <button onClick={handleCompleteDigest} className="btn-primary">
                        Complete Digest — Done for today!
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="glass-card p-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                    <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Digest Complete!</h3>
                  <p className="mt-2 text-slate-400">
                    7 items reviewed · 5 auto-approved · 2 manually approved · 4.2
                    hours saved
                  </p>
                  <button
                    onClick={() => {
                      setDigestComplete(false);
                      setDigest(initialDigest);
                    }}
                    className="btn-secondary mt-6"
                  >
                    Reset Demo
                  </button>
                </div>
              )}
            </div>
          )}

          {/* CALENDAR VIEW */}
          {view === "calendar" && (
            <div className="animate-fade-in">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Calendar & Scheduling Rules
                    <DevNote text="Natural language rules stored in DB. Google Calendar API checks availability and applies rules when resolving invites. No back-and-forth scheduling emails." />
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    AI resolves scheduling requests against your rules automatically
                  </p>
                </div>
                <button
                  onClick={() => setShowRuleModal(true)}
                  className="btn-primary text-sm"
                >
                  + Add Rule
                </button>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="glass-card p-5">
                  <h3 className="mb-4 font-semibold text-white">
                    Active Rules
                    <DevNote text="Rules parsed from natural language via LLM and stored as structured constraints. E.g. 'never before 10am' → { earliestStart: '10:00', weekdays: true }." />
                  </h3>
                  <ul className="space-y-2">
                    {rules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between rounded-lg bg-surface-700/50 px-3 py-2.5 text-sm text-slate-300"
                      >
                        <span>{rule}</span>
                        <button
                          onClick={() => handleRemoveRule(idx)}
                          className="text-slate-500 transition hover:text-red-400"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-5">
                  <h3 className="mb-4 font-semibold text-white">This Week</h3>
                  <div className="space-y-3">
                    {calendar.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between rounded-lg border border-slate-700/50 p-3"
                      >
                        <div>
                          <div className="font-medium text-white">{event.title}</div>
                          <div className="text-xs text-slate-500">
                            {event.date} · {event.time} · {event.source}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              event.status === "confirmed"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : event.status === "proposed"
                                  ? "bg-brand-600/20 text-brand-400"
                                  : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {event.status}
                          </span>
                          {event.status === "proposed" && (
                            <>
                              <button
                                onClick={() => handleConfirmCalendar(event.id)}
                                className="rounded bg-emerald-600/20 px-2 py-1 text-xs text-emerald-400 hover:bg-emerald-600/30"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleDeclineCalendar(event.id)}
                                className="rounded bg-red-600/20 px-2 py-1 text-xs text-red-400 hover:bg-red-600/30"
                              >
                                Decline
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* INTEGRATIONS VIEW */}
          {view === "integrations" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">
                  Integrations
                  <DevNote text="Gmail/Outlook use push notification webhooks (Pub/Sub, Graph API). Slack uses Events API. Calendly-style links generated via internal scheduling engine. All OAuth2 — no API keys in client." />
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Connect your tools — DeskDeflect ingests and acts automatically
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {integrations.map((integ) => (
                  <div
                    key={integ.id}
                    onClick={() => setSelectedIntegration(integ)}
                    className={`glass-card cursor-pointer p-5 transition hover:border-brand-600/30 ${
                      selectedIntegration?.id === integ.id ? "border-brand-600/50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{integ.icon}</span>
                        <div>
                          <h3 className="font-semibold text-white">{integ.name}</h3>
                          <p className="text-xs text-slate-500">
                            {integ.connected
                              ? `Synced ${integ.lastSync}`
                              : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleIntegration(integ.id);
                        }}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                          integ.connected
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-surface-600 text-slate-400 hover:text-white"
                        }`}
                      >
                        {integ.connected ? "Connected" : "Connect"}
                      </button>
                    </div>
                    {integ.connected && (
                      <p className="mt-3 text-sm text-slate-400">
                        {integ.itemsProcessed.toLocaleString()} items processed
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {selectedIntegration && (
                <div className="mt-6 glass-card p-5">
                  <h3 className="font-semibold text-white">
                    {selectedIntegration.name} Details
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-surface-700/50 p-4">
                      <div className="text-xs text-slate-500">Status</div>
                      <div className="mt-1 text-sm font-medium text-white">
                        {selectedIntegration.connected ? "Active" : "Disconnected"}
                      </div>
                    </div>
                    <div className="rounded-lg bg-surface-700/50 p-4">
                      <div className="text-xs text-slate-500">Last Sync</div>
                      <div className="mt-1 text-sm font-medium text-white">
                        {selectedIntegration.lastSync}
                      </div>
                    </div>
                    <div className="rounded-lg bg-surface-700/50 p-4">
                      <div className="text-xs text-slate-500">Items Processed</div>
                      <div className="mt-1 text-sm font-medium text-white">
                        {selectedIntegration.itemsProcessed.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      showToast(
                        `${selectedIntegration.name} sync triggered — 3 new items ingested`
                      )
                    }
                    className="btn-secondary mt-4 text-sm"
                  >
                    Force Sync Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ANALYTICS VIEW */}
          {view === "analytics" && (
            <div className="animate-fade-in">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Analytics Dashboard
                    <DevNote text="Metrics computed from classification pipeline logs. In production: Supabase for storage, daily aggregation cron, optional PostHog for product analytics." />
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Your admin firewall at work
                  </p>
                </div>
                <div className="flex gap-2">
                  {(["7d", "30d", "90d"] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setAnalyticsRange(range);
                        showToast(`Showing ${range} data`);
                      }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                        analyticsRange === range
                          ? "bg-brand-600 text-white"
                          : "bg-surface-700 text-slate-400"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Processed", value: weeklyStats.totalProcessed, unit: "items" },
                  { label: "Auto-handled", value: weeklyStats.autoHandled, unit: "63%" },
                  { label: "Time Saved", value: weeklyStats.timeSavedHours, unit: "hrs/week" },
                  { label: "Avg Response", value: weeklyStats.avgResponseMin, unit: "min" },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-5">
                    <div className="text-xs text-slate-500">{stat.label}</div>
                    <div className="mt-1 text-2xl font-bold text-white">
                      {stat.value}
                      <span className="ml-1 text-sm font-normal text-slate-500">
                        {stat.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-5">
                <h3 className="mb-4 font-semibold text-white">
                  Classification Breakdown
                </h3>
                <div className="flex items-end gap-3 h-48">
                  {chartData.map((day) => {
                    const total = day.auto + day.draft + day.escalate;
                    return (
                      <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
                        <div className="flex w-full flex-col justify-end h-40 gap-0.5">
                          <div
                            className="w-full rounded-t bg-emerald-500/70 transition-all"
                            style={{ height: `${(day.escalate / maxChart) * 100}%` }}
                            title={`Escalate: ${day.escalate}`}
                          />
                          <div
                            className="w-full bg-brand-500/70"
                            style={{ height: `${(day.draft / maxChart) * 100}%` }}
                            title={`Draft: ${day.draft}`}
                          />
                          <div
                            className="w-full rounded-b bg-emerald-400/50"
                            style={{ height: `${(day.auto / maxChart) * 100}%` }}
                            title={`Auto: ${day.auto}`}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{day.day}</span>
                        <span className="text-[10px] text-slate-600">{total}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded bg-emerald-400/50" /> Auto-handle
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded bg-brand-500/70" /> Draft & confirm
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded bg-emerald-500/70" /> Escalate
                  </span>
                </div>
              </div>

              <div className="mt-6 glass-card p-5">
                <h3 className="mb-4 font-semibold text-white">Recent Activity</h3>
                <div className="space-y-3">
                  {activityFeed.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 border-b border-slate-800/50 pb-3 last:border-0"
                    >
                      <span className="w-16 font-mono text-xs text-slate-600">
                        {event.time}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          event.type === "auto"
                            ? "bg-emerald-400"
                            : event.type === "draft"
                              ? "bg-brand-400"
                              : event.type === "calendar"
                                ? "bg-purple-400"
                                : event.type === "escalate"
                                  ? "bg-amber-400"
                                  : "bg-slate-400"
                        }`}
                      />
                      <div className="flex-1">
                        <span className="text-sm text-white">{event.action}</span>
                        <span className="ml-2 text-sm text-slate-500">
                          {event.detail}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Forward Modal */}
      {showForwardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-white">Forward a Task</h3>
            <p className="mt-2 text-sm text-slate-400">
              Paste an email subject or describe an admin task to forward to your
              async inbox.
            </p>
            <input
              type="text"
              value={forwardSubject}
              onChange={(e) => setForwardSubject(e.target.value)}
              placeholder="e.g. Vendor invoice from Acme Corp"
              className="mt-4 w-full rounded-lg border border-slate-700 bg-surface-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-600 focus:outline-none"
            />
            <textarea
              value={forwardDetails}
              onChange={(e) => setForwardDetails(e.target.value)}
              placeholder="Optional details..."
              rows={3}
              className="mt-3 w-full rounded-lg border border-slate-700 bg-surface-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-600 focus:outline-none"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowForwardModal(false)}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newItem: InboxItem = {
                    id: `inb-${Date.now()}`,
                    from: "You (forwarded)",
                    company: "Manual forward",
                    subject: forwardSubject || "New forwarded task",
                    preview:
                      forwardDetails || "Manually forwarded via demo UI",
                    receivedAt: new Date().toISOString(),
                    classification: "draft-and-confirm",
                    status: "queued",
                    source: "forwarded",
                    tags: ["forwarded"],
                    aiDraft:
                      "Thanks for reaching out. I'll review this and get back to you shortly.",
                  };
                  setInbox((prev) => [newItem, ...prev]);
                  setShowForwardModal(false);
                  setForwardSubject("");
                  setForwardDetails("");
                  setView("inbox");
                  showToast("Task forwarded — AI classifying now...");
                }}
                className="btn-primary text-sm"
              >
                Forward to Inbox
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Rule Modal */}
      {showRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="glass-card w-full max-w-md p-6 animate-slide-up">
            <h3 className="text-lg font-semibold text-white">
              Add Scheduling Rule
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Describe your rule in plain English. AI will parse and enforce it.
            </p>
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              placeholder="e.g. No meetings on Mondays before noon"
              className="mt-4 w-full rounded-lg border border-slate-700 bg-surface-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-brand-600 focus:outline-none"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowRuleModal(false);
                  setNewRule("");
                }}
                className="btn-secondary text-sm"
              >
                Cancel
              </button>
              <button onClick={handleAddRule} className="btn-primary text-sm">
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
    </div>
  );
}
