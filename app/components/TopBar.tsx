"use client";

import { signOut } from "next-auth/react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LEFT: Logo + Logout */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-white">
            🎥 Safegram
          </span>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm px-3 py-1.5 rounded-lg border border-white/20
                       hover:bg-white/10 transition text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
