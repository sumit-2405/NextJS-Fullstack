"use client";

import { ImageKitProvider } from "imagekitio-next";

export default function IKProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
    >
      {children}
    </ImageKitProvider>
  );
}

