"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function VideoUploadForm() {
  const { data: session } = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a video file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      /* -------------------------------
         1️⃣ Get ImageKit auth parameters
      -------------------------------- */
      const authRes = await fetch("/api/imagekit-auth");

      if (!authRes.ok) {
        throw new Error("Failed to get ImageKit auth");
      }

      const {
        authenticationParameters,
        publicKey,
      } = await authRes.json();

      /* -------------------------------
         2️⃣ Upload video to ImageKit
      -------------------------------- */
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);

      // required ImageKit auth params
      formData.append("publicKey", publicKey);
      formData.append("token", authenticationParameters.token);
      formData.append("signature", authenticationParameters.signature);
      formData.append(
        "expire",
        authenticationParameters.expire.toString()
      );

      // optional but recommended
      formData.append("folder", "/videos");

      const uploadRes = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok || !uploadData.url) {
        console.error("ImageKit upload error:", uploadData);
        throw new Error("Video upload failed");
      }

      // 3️⃣ Save video metadata to DB
const saveRes = await fetch("/api/video", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title,
    description,
    videourl: uploadData.filePath, // ✅ MUST USE url
    controls: true,
  }),
});

if (!saveRes.ok) {
  const err = await saveRes.json();
  throw new Error(err.error || "Failed to save video details");
}

      /* -------------------------------
         4️⃣ Success cleanup
      -------------------------------- */
      setMessage("✅ Video uploaded successfully");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error: any) {
      console.error("Upload error:", error);
      setMessage(error.message || "Video upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full"
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="file-input file-input-bordered w-full"
        required
      />

      <motion.button
  whileTap={{ scale: 0.95 }}
  whileHover={{ scale: 1.02 }}
  type="submit"
  disabled={loading}
  className="btn btn-primary w-full mt-2"
>
  {loading ? "Uploading..." : "Upload Video"}
</motion.button>


      {message && (
        <p className="text-center text-sm mt-2">{message}</p>
      )}
    </form>
  );
}
