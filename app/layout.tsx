import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const rajd = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Satisguessry",
  description: "",
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
        className={`${rajd.className} antialiased min-h-dvh bg-secondary flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
