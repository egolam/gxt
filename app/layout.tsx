import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/providers/Providers";
import { Background } from "@/components/background/Background";
import { MdOutlineWarning } from "react-icons/md";

const rajd = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satisguessry",
  description: "The most satisfactory geography guessing game.",
  keywords: [
    "satisfactory",
    "pioneer",
    "geography",
    "steam",
    "epic",
    "ficsit",
    "geoguessr",
    "automation",
    "factorio",
    "guess",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>

      <body
        className={`${rajd.className} antialiased min-h-dvh flex justify-center md:items-center relative select-none `}
      >
        <Background />
        <Providers>
          {children}
          <Toaster
            richColors
            theme="dark"
            toastOptions={{ style: { borderRadius: "0 0 0 0" } }}
            icons={{ error: <MdOutlineWarning size={16} />, success: null }}
            position="bottom-center"
          />
        </Providers>
      </body>
    </html>
  );
}
