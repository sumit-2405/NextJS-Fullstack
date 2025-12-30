import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

/* ===== GET LOGGED-IN USER VIDEOS ===== */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json([]);
  }

  await connectToDatabase();

  const videos = await Video.find({
    userId: session.user.id,
  }).sort({ createdAt: -1 });

  return NextResponse.json(videos);
}

/* ===== CREATE VIDEO ===== */
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { videourl, title, description } = body;

  if (!videourl || !title || !description) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const video = await Video.create({
    videourl,
    title,
    description,
    userId: session.user.id,
  });

  return NextResponse.json(video, { status: 201 });
}
