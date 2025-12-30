"use client";

import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { VideoDTO } from "@/types/video";

interface Props {
  video: VideoDTO;
  clickable?: boolean; // ⬅️ new
}

export default function VideoComponent({ video, clickable = true }: Props) {
  const VideoPlayer = (
    <div
      className="rounded-xl overflow-hidden relative w-full"
      style={{ aspectRatio: "9 / 16" }}
    >
      <IKVideo
        path={video.videourl}
        transformation={[
          {
            height: "1920",
            width: "1080",
          },
        ]}
        controls={video.controls ?? true}
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        {clickable ? (
          <Link href={`/videos/${video._id}`} className="block">
            {VideoPlayer}
          </Link>
        ) : (
          VideoPlayer // ⬅️ no link, controls work
        )}
      </figure>

      <div className="card-body p-4">
        {clickable ? (
          <Link href={`/videos/${video._id}`}>
            <h2 className="card-title text-lg hover:opacity-80">
              {video.title}
            </h2>
          </Link>
        ) : (
          <h2 className="card-title text-lg">{video.title}</h2>
        )}

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
