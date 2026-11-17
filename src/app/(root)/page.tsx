"use client";

import { useEffect } from "react";

// A static host has no Next.js Proxy to redirect / to /en.
export default function LanguageGateway() {
  useEffect(() => {
    window.location.replace(new URL("en/", window.location.href).toString());
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F5F3EE] px-6 text-center text-[#0F1B2D]">
      <h1 className="text-3xl font-bold">SapiHive</h1>
      <p>Choose your language to continue.</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a className="rounded-full bg-[#0F1B2D] px-6 py-3 text-white" href="./en/">English</a>
        <a className="rounded-full border border-[#0F1B2D]/20 px-6 py-3" href="./ar/" lang="ar" dir="rtl">العربية</a>
      </div>
    </main>
  );
}
