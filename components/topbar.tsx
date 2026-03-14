"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export function Topbar() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || user?.username || "Signed in";

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-midnight/80 border-b border-white/10 px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-white font-semibold">CRM360</Link>
      <SignedIn>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-slate-200">{email}</span>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton>
          <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-mint to-lilac text-slate-900 text-sm">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
    </header>
  );
}
