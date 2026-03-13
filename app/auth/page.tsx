"use client";

import { useState } from "react";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending magic link...");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: "http://localhost:3000" } });
    if (error) setStatus(`Error: ${error.message}`);
    else setStatus("Check your email for the sign-in link.");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass max-w-md w-full p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-white">Sign in</h1>
        <p className="text-slate-400 text-sm">Use your work email. We’ll send a magic link.</p>
        <form onSubmit={handleSignIn} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-mint"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-mint to-lilac text-slate-900 font-semibold"
          >
            Send magic link
          </button>
        </form>
        {status && <p className="text-sm text-slate-300">{status}</p>}
      </div>
    </main>
  );
}
