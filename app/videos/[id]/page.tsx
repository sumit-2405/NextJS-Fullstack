import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import VideoPlayer from "./VideoPlayer";
import mongoose from "mongoose";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: Props) {
  // ✅ await params FIRST
  const { id } = await params;

  // ✅ validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return <div className="text-center py-20">Invalid video ID</div>;
  }

  await connectToDatabase();

  const video = await Video.findById(id).lean();

  if (!video) {
    return <div className="text-center py-20">Video not found</div>;
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <VideoPlayer video={JSON.parse(JSON.stringify(video))} />
    </div>
  );
}
