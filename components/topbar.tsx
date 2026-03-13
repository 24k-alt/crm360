"use client";

import Link from "next/link";
import { useSession } from "../lib/useSession";
import { supabaseBrowser } from "../lib/supabaseBrowser";

export function Topbar() {
  const { session, loading } = useSession();
  const supabase = supabaseBrowser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-midnight/80 border-b border-white/10 px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-white font-semibold">CRM360</Link>
      {loading ? (
        <span className="text-slate-400 text-sm">Checking session…</span>
      ) : session ? (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-200">{session.user.email}</span>
          <button onClick={handleSignOut} className="px-3 py-1 rounded-lg bg-white/10 border border-white/10">Sign out</button>
        </div>
      ) : (
        <Link href="/auth" className="px-3 py-1 rounded-lg bg-gradient-to-r from-mint to-lilac text-slate-900 text-sm">Sign in</Link>
      )}
    </header>
  );
}
