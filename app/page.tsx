"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <section className="relative text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center py-24"
      >
        {/* HERO */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Private Video Sharing
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-10">
          Upload, manage, and watch your videos securely.
          <br />
          Only you decide who sees your content.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl border border-gray-600 text-white
                         hover:bg-white hover:text-black transition"
            >
              Login
            </motion.button>
          </Link>

          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl border border-gray-600 text-white
                         hover:bg-white hover:text-black transition"
            >
              Sign Up
            </motion.button>
          </Link>
        </div>

        {/* FEATURES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <Feature
            title="🔒 Private by Default"
            desc="Your videos are visible only to logged-in users."
          />
          <Feature
            title="⚡ Fast Uploads"
            desc="Powered by ImageKit for lightning-fast delivery."
          />
          <Feature
            title="🎥 Built for Reels"
            desc="Vertical-friendly UI with smooth playback."
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl border border-gray-800 p-6
                 bg-neutral-900/60 backdrop-blur-md transition"
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
  );
}
