"use client";

import { IKVideo } from "imagekitio-next";

interface Video {
  videourl: string;
  title: string;
  description: string;
  controls?: boolean;
}

export default function VideoPlayer({ video }: { video: Video }) {
  return (
    <>
      <IKVideo
        path={video.videourl}
        controls={video.controls ?? true}
        className="w-full rounded-xl aspect-[9/16]"
      />

      <h1 className="mt-4 text-xl font-bold">
        {video.title}
      </h1>

      <p className="text-base-content/70">
        {video.description}
      </p>
    </>
  );
}
