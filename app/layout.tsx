import "./globals.css";
import ClientRoot from "./components/ClientRoot";
import AnimatedBackground from "@/app/components/AnimatedBackground";
import TopBar from "@/app/components/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white overflow-x-hidden">
        <ClientRoot>

          {/* 🌌 Global animated background (ONCE) */}
          <AnimatedBackground />

          {/* 🔝 Global Top Bar */}
          <TopBar />

          {/* 📦 Page content */}
          <main className="relative z-10 pt-20">
            {children}
          </main>

        </ClientRoot>
      </body>
    </html>
  );
}
