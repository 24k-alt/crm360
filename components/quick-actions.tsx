"use client";

import { Plus, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export function QuickActions() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <button className="glass px-3 py-2 text-sm" onClick={() => router.push("/sign-in")}>Sign in</button>
      <button className="glass px-3 py-2 text-sm flex items-center gap-2" onClick={() => window.scrollTo({ top: 9999, behavior: "smooth" })}>
        <Zap className="w-4 h-4 text-mint" /> Automate
      </button>
      <button className="bg-gradient-to-r from-mint to-lilac text-slate-900 px-4 py-2 rounded-lg flex items-center gap-2" onClick={() => window.scrollTo({ top: 9999, behavior: "smooth" })}>
        <Plus className="w-4 h-4" /> New Deal
      </button>
    </div>
  );
}
