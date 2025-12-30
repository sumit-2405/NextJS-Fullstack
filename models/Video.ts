import mongoose, { Schema, model, models } from "mongoose";

export interface IVideo {
  videourl: string;
  _id: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  userId: string; // ✅ REQUIRED
  controls?: boolean;
  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };
}


const VideoSchema = new Schema<IVideo>(
  {
    videourl: { type: String, required: true },
    thumbnailUrl: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true }, // ✅ ADD THIS
    controls: { type: Boolean, default: true },
    transformation: {
      width: { type: Number, default: 1080 },
      height: { type: Number, default: 1920 },
      quality: { type: Number, default: 80 },
    },
  },
  { timestamps: true }
);

export default models.Video || model<IVideo>("Video", VideoSchema);
