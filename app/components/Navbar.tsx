"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
        
        {/* LOGO */}
        <Link href="/" className="font-bold text-lg">
          🎥 PrivateVideo
        </Link>

        {/* RIGHT */}
        {!session ? (
          <div className="flex gap-4">
            <Link href="/login" className="hover:opacity-80">
              Login
            </Link>
            <Link
              href="/registration"
              className="px-4 py-1.5 rounded-lg bg-primary text-black font-medium"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-primary text-black font-bold flex items-center justify-center"
            >
              {session.user?.name?.[0]?.toUpperCase() || "U"}
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 mt-3 w-44 bg-neutral-900 border border-white/10 rounded-xl shadow-lg overflow-hidden"
                >
                  <Link
                    href="/upload"
                    className="block px-4 py-2 hover:bg-white/5"
                  >
                    Upload Video
                  </Link>
                  <Link
                    href="/videos"
                    className="block px-4 py-2 hover:bg-white/5"
                  >
                    My Videos
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </nav>
  );
}
