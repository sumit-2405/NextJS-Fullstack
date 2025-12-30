"use client";

import { motion } from "framer-motion";
import VideoUploadForm from "@/app/components/VideoUploadForm";
import VideoFeed from "@/app/components/VideoFeed";

export default function UploadPage() {
  return (
    <section className="min-h-screen text-white">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 py-12"
      >
        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold tracking-tight">
            Upload New Reel
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Share your moments securely
          </p>
        </div>

        {/* UPLOAD FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto bg-neutral-900/70 backdrop-blur
                     border border-neutral-800 rounded-2xl p-6 mb-20"
        >
          <VideoUploadForm />
        </motion.div>

        {/* VIDEO FEED */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">
            Your Uploaded Videos
          </h2>
        </div>

        <VideoFeed />
      </motion.div>

    </section>
  );
}
