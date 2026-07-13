import type { Metadata } from "next";
import DemoApp from "@/components/DemoApp";

export const metadata: Metadata = {
  title: "Interactive Demo — DeskDeflect",
  description:
    "Try DeskDeflect's async inbox, AI classification, calendar rules, daily digest, and integrations — fully interactive mock demo.",
};

export default function DemoPage() {
  return <DemoApp />;
}
