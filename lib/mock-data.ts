export type Classification = "auto-handle" | "draft-and-confirm" | "escalate";
export type InboxSource = "gmail" | "outlook" | "slack" | "forwarded";
export type InboxStatus = "handled" | "pending" | "queued" | "archived";

export interface InboxItem {
  id: string;
  from: string;
  company: string;
  subject: string;
  preview: string;
  receivedAt: string;
  classification: Classification;
  status: InboxStatus;
  source: InboxSource;
  amount?: string;
  aiDraft?: string;
  tags: string[];
}

export interface ActivityEvent {
  id: string;
  time: string;
  action: string;
  detail: string;
  type: "auto" | "draft" | "calendar" | "integration" | "escalate";
}

export interface DigestItem {
  id: string;
  subject: string;
  from: string;
  action: string;
  classification: Classification;
  draftPreview: string;
  needsDecision: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  status: "confirmed" | "proposed" | "declined";
  source: string;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSync: string;
  itemsProcessed: number;
}

export const inboxItems: InboxItem[] = [
  {
    id: "inb-001",
    from: "Sarah Chen",
    company: "Vercel",
    subject: "Q2 partnership renewal — signature needed",
    preview:
      "Hi Alex, attached is the updated MSA for our partnership renewal. Please review and sign by Friday...",
    receivedAt: "2026-07-12T08:14:00",
    classification: "draft-and-confirm",
    status: "queued",
    source: "gmail",
    tags: ["vendor", "contract"],
    aiDraft:
      "Thanks Sarah — I've reviewed the MSA and it looks good. I'll sign via DocuSign today and send confirmation once complete.",
  },
  {
    id: "inb-002",
    from: "AWS Billing",
    company: "Amazon Web Services",
    subject: "Your July invoice is ready — $1,247.83",
    preview:
      "Your AWS bill for account 4829-1102 is now available. Payment will be charged to card ending 4242...",
    receivedAt: "2026-07-12T07:45:00",
    classification: "auto-handle",
    status: "handled",
    source: "gmail",
    amount: "$1,247.83",
    tags: ["billing", "receipt"],
    aiDraft: "Acknowledged — invoice logged to expense tracker. No action required.",
  },
  {
    id: "inb-003",
    from: "Dr. Patel's Office",
    company: "Bay Area Medical",
    subject: "Appointment request: Annual physical",
    preview:
      "We have openings on July 18 at 9:00 AM or July 22 at 2:30 PM. Please confirm your preference...",
    receivedAt: "2026-07-12T06:30:00",
    classification: "draft-and-confirm",
    status: "queued",
    source: "forwarded",
    tags: ["appointment", "personal"],
    aiDraft:
      "July 22 at 2:30 PM works best — please confirm. Note: scheduling rule applied (no appointments before 10 AM on workdays).",
  },
  {
    id: "inb-004",
    from: "Marcus Webb",
    company: "Stripe",
    subject: "Re: API rate limit increase request",
    preview:
      "We can bump your rate limit to 5,000 req/min. Do you want us to apply this to production or staging first?",
    receivedAt: "2026-07-11T16:22:00",
    classification: "escalate",
    status: "pending",
    source: "gmail",
    tags: ["infrastructure", "decision"],
    aiDraft:
      "Apply to staging first for 48 hours, then production if no issues. Please confirm this approach.",
  },
  {
    id: "inb-005",
    from: "GitHub",
    company: "GitHub Inc.",
    subject: "[deskdeflect/api] Security alert: lodash dependency",
    preview:
      "We found a potential vulnerability in lodash@4.17.20. A patch is available in 4.17.21...",
    receivedAt: "2026-07-11T14:08:00",
    classification: "auto-handle",
    status: "handled",
    source: "gmail",
    tags: ["security", "dev"],
    aiDraft: "Auto-merged Dependabot PR #847. Vulnerability patched.",
  },
  {
    id: "inb-006",
    from: "Jessica Morales",
    company: "Acme Corp",
    subject: "Coffee chat next week?",
    preview:
      "Hey! Would love to catch up about the integration project. Are you free Tuesday or Wednesday afternoon?",
    receivedAt: "2026-07-11T11:55:00",
    classification: "draft-and-confirm",
    status: "queued",
    source: "outlook",
    tags: ["networking", "calendar"],
    aiDraft:
      "Wednesday 2:00–2:30 PM PT works — I'll send a Calendly link. (Rule: no back-to-back meetings applied.)",
  },
  {
    id: "inb-007",
    from: "Expensify",
    company: "Expensify",
    subject: "Expense report #ER-2847 submitted for approval",
    preview:
      "Your expense report for $342.50 (AWS re:Invent travel) has been submitted to your manager...",
    receivedAt: "2026-07-11T09:30:00",
    classification: "auto-handle",
    status: "archived",
    source: "gmail",
    amount: "$342.50",
    tags: ["expense", "receipt"],
  },
  {
    id: "inb-008",
    from: "#general",
    company: "Slack — Acme Engineering",
    subject: "@alex Can you approve the staging deploy?",
    preview:
      "Deploy v2.4.1 to staging is blocked on your approval. PR #312 is ready.",
    receivedAt: "2026-07-11T08:15:00",
    classification: "escalate",
    status: "pending",
    source: "slack",
    tags: ["deploy", "urgent"],
    aiDraft: "Needs your yes/no — staging deploy for v2.4.1 (PR #312).",
  },
  {
    id: "inb-009",
    from: "Mailchimp",
    company: "Intuit Mailchimp",
    subject: "Your weekly campaign performance report",
    preview:
      "Open rate: 24.3% (+2.1%). Click rate: 3.8%. Top performing link: Product update blog post...",
    receivedAt: "2026-07-10T18:00:00",
    classification: "auto-handle",
    status: "archived",
    source: "gmail",
    tags: ["newsletter", "marketing"],
  },
  {
    id: "inb-010",
    from: "David Kim",
    company: "Investor — Horizon Ventures",
    subject: "Board meeting reschedule",
    preview:
      "Can we move Thursday's board sync to Friday 11 AM? Travel conflict on my end.",
    receivedAt: "2026-07-10T15:40:00",
    classification: "draft-and-confirm",
    status: "queued",
    source: "outlook",
    tags: ["board", "calendar"],
    aiDraft:
      "Friday 11:00 AM–12:00 PM PT confirmed on your calendar. Declined conflicting 1:1 with engineering.",
  },
  {
    id: "inb-011",
    from: "FedEx",
    company: "FedEx",
    subject: "Package delivered: MacBook Pro 16\"",
    preview: "Your package was delivered to front desk at 2:14 PM on July 10...",
    receivedAt: "2026-07-10T14:20:00",
    classification: "auto-handle",
    status: "archived",
    source: "forwarded",
    tags: ["shipping", "personal"],
  },
  {
    id: "inb-012",
    from: "HR — Acme Corp",
    company: "Acme Corp",
    subject: "Action required: Benefits enrollment deadline July 20",
    preview:
      "Open enrollment closes July 20. Please review your 2026 health plan selections...",
    receivedAt: "2026-07-10T10:00:00",
    classification: "escalate",
    status: "pending",
    source: "outlook",
    tags: ["hr", "deadline"],
    aiDraft:
      "Benefits enrollment due July 20. Current plan: PPO Gold. No changes recommended — confirm to keep current selection?",
  },
];

export const activityFeed: ActivityEvent[] = [
  {
    id: "act-001",
    time: "08:14",
    action: "Classified email",
    detail: "Vercel MSA → draft-and-confirm",
    type: "draft",
  },
  {
    id: "act-002",
    time: "07:45",
    action: "Auto-handled",
    detail: "AWS invoice $1,247.83 logged to expenses",
    type: "auto",
  },
  {
    id: "act-003",
    time: "07:30",
    action: "Calendar rule applied",
    detail: "Rejected 9 AM appointment — 'never before 10am'",
    type: "calendar",
  },
  {
    id: "act-004",
    time: "06:55",
    action: "Gmail sync",
    detail: "12 new messages ingested via webhook",
    type: "integration",
  },
  {
    id: "act-005",
    time: "06:30",
    action: "Draft created",
    detail: "Dr. Patel appointment — proposed Jul 22 2:30 PM",
    type: "draft",
  },
  {
    id: "act-006",
    time: "Yesterday",
    action: "Escalated",
    detail: "Stripe rate limit — awaiting your decision",
    type: "escalate",
  },
  {
    id: "act-007",
    time: "Yesterday",
    action: "Auto-handled",
    detail: "GitHub security alert — Dependabot PR merged",
    type: "auto",
  },
  {
    id: "act-008",
    time: "Yesterday",
    action: "Slack ingested",
    detail: "3 messages from #general, #deploys",
    type: "integration",
  },
  {
    id: "act-009",
    time: "Jul 10",
    action: "Calendar confirmed",
    detail: "Board meeting moved to Fri 11 AM",
    type: "calendar",
  },
  {
    id: "act-010",
    time: "Jul 10",
    action: "Digest sent",
    detail: "7 items reviewed, 5 auto-approved, 2 decisions pending",
    type: "draft",
  },
];

export const digestItems: DigestItem[] = [
  {
    id: "dig-001",
    subject: "Q2 partnership renewal — signature needed",
    from: "Sarah Chen @ Vercel",
    action: "Send signed MSA via DocuSign",
    classification: "draft-and-confirm",
    draftPreview:
      "Thanks Sarah — I've reviewed the MSA and it looks good. I'll sign via DocuSign today.",
    needsDecision: true,
  },
  {
    id: "dig-002",
    subject: "Appointment request: Annual physical",
    from: "Dr. Patel's Office",
    action: "Confirm Jul 22 at 2:30 PM",
    classification: "draft-and-confirm",
    draftPreview: "July 22 at 2:30 PM works best — please confirm.",
    needsDecision: true,
  },
  {
    id: "dig-003",
    subject: "Coffee chat next week?",
    from: "Jessica Morales @ Acme Corp",
    action: "Send Calendly link for Wed 2 PM",
    classification: "draft-and-confirm",
    draftPreview: "Wednesday 2:00–2:30 PM PT works — I'll send a Calendly link.",
    needsDecision: true,
  },
  {
    id: "dig-004",
    subject: "Board meeting reschedule",
    from: "David Kim @ Horizon Ventures",
    action: "Confirmed Fri 11 AM on calendar",
    classification: "draft-and-confirm",
    draftPreview: "Friday 11:00 AM–12:00 PM PT confirmed.",
    needsDecision: false,
  },
  {
    id: "dig-005",
    subject: "Your July invoice is ready",
    from: "AWS Billing",
    action: "Auto-logged to expense tracker",
    classification: "auto-handle",
    draftPreview: "Invoice $1,247.83 logged. No action required.",
    needsDecision: false,
  },
  {
    id: "dig-006",
    subject: "Security alert: lodash dependency",
    from: "GitHub",
    action: "Dependabot PR #847 auto-merged",
    classification: "auto-handle",
    draftPreview: "Vulnerability patched automatically.",
    needsDecision: false,
  },
  {
    id: "dig-007",
    subject: "Weekly campaign performance",
    from: "Mailchimp",
    action: "Archived — newsletter digest only",
    classification: "auto-handle",
    draftPreview: "Open rate 24.3%. Summary saved to reports folder.",
    needsDecision: false,
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "cal-001",
    title: "Deep work block",
    date: "Jul 13",
    time: "9:00 AM – 12:00 PM",
    duration: "3h",
    status: "confirmed",
    source: "Protected",
  },
  {
    id: "cal-002",
    title: "Engineering standup",
    date: "Jul 13",
    time: "10:00 AM – 10:15 AM",
    duration: "15m",
    status: "confirmed",
    source: "Google Calendar",
  },
  {
    id: "cal-003",
    title: "Coffee chat — Jessica Morales",
    date: "Jul 16",
    time: "2:00 PM – 2:30 PM",
    duration: "30m",
    status: "proposed",
    source: "DeskDeflect AI",
  },
  {
    id: "cal-004",
    title: "Board sync — Horizon Ventures",
    date: "Jul 18",
    time: "11:00 AM – 12:00 PM",
    duration: "1h",
    status: "confirmed",
    source: "DeskDeflect AI",
  },
  {
    id: "cal-005",
    title: "Annual physical — Dr. Patel",
    date: "Jul 22",
    time: "2:30 PM – 3:30 PM",
    duration: "1h",
    status: "proposed",
    source: "DeskDeflect AI",
  },
  {
    id: "cal-006",
    title: "1:1 with Marcus (Stripe)",
    date: "Jul 18",
    time: "1:00 PM – 1:30 PM",
    duration: "30m",
    status: "declined",
    source: "Auto-declined",
  },
];

export const schedulingRules = [
  "Never schedule before 10:00 AM on weekdays",
  "No back-to-back meetings — 15 min buffer required",
  "Block 9 AM – 12 PM Mon/Wed/Fri for deep work",
  "Max 3 external meetings per day",
  "Prefer afternoons for vendor calls (after 2 PM)",
  "No meetings on Fridays after 3 PM",
];

export const integrations: Integration[] = [
  {
    id: "int-gmail",
    name: "Gmail",
    icon: "📧",
    connected: true,
    lastSync: "2 min ago",
    itemsProcessed: 847,
  },
  {
    id: "int-outlook",
    name: "Outlook",
    icon: "📬",
    connected: true,
    lastSync: "5 min ago",
    itemsProcessed: 312,
  },
  {
    id: "int-calendly",
    name: "Calendly",
    icon: "📅",
    connected: true,
    lastSync: "12 min ago",
    itemsProcessed: 56,
  },
  {
    id: "int-slack",
    name: "Slack",
    icon: "💬",
    connected: true,
    lastSync: "1 min ago",
    itemsProcessed: 423,
  },
  {
    id: "int-gcal",
    name: "Google Calendar",
    icon: "🗓️",
    connected: true,
    lastSync: "3 min ago",
    itemsProcessed: 128,
  },
  {
    id: "int-stripe",
    name: "Stripe (billing)",
    icon: "💳",
    connected: false,
    lastSync: "—",
    itemsProcessed: 0,
  },
];

export const weeklyStats = {
  totalProcessed: 156,
  autoHandled: 98,
  draftConfirm: 41,
  escalated: 17,
  timeSavedHours: 4.2,
  avgResponseMin: 3.8,
};

export const chartData = [
  { day: "Mon", auto: 18, draft: 6, escalate: 2 },
  { day: "Tue", auto: 22, draft: 8, escalate: 3 },
  { day: "Wed", auto: 15, draft: 5, escalate: 1 },
  { day: "Thu", auto: 20, draft: 9, escalate: 4 },
  { day: "Fri", auto: 23, draft: 7, escalate: 3 },
  { day: "Sat", auto: 8, draft: 2, escalate: 1 },
  { day: "Sun", auto: 5, draft: 1, escalate: 0 },
];
