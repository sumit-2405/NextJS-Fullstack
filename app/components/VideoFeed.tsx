"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoComponent from "./VideoComponent";

export interface IVideo {
  _id: string;
  videourl: string;
  title: string;
  description: string;
  userId: string;
  controls?: boolean;
  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };
}

export default function VideoFeed() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/video", {
          credentials: "include",
          cache: "no-store",
        });

        // ⚠️ Do NOT throw — API may return [] or 401
        if (!res.ok) {
          setVideos([]);
          return;
        }

        const data = await res.json();
        setVideos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Video fetch error:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <motion.div
          className="text-base-content/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading videos...
        </motion.div>
      </div>
    );
  }

  /* ================= EMPTY ================= */

  if (videos.length === 0) {
    return (
      <div className="flex justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base-content/70"
        >
          No videos found
        </motion.div>
      </div>
    );
  }

  /* ================= VIDEO GRID ================= */

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {videos.map((video) => (
        <motion.div
          key={video._id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <VideoComponent video={video} />
        </motion.div>
      ))}
    </motion.div>
  );
}
