import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Topbar } from "../components/topbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "CRM360",
  description: "ClickUp-inspired CRM with AI copilot"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-midnight text-slate-100">
        <ClerkProvider>
          <div className="min-h-screen bg-mesh">
            <Topbar />
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
