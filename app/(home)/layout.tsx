import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full lg:w-5xl">
      <Header />
      {/* <Navbar /> */}
      <main className="flex flex-col justify-center px-4 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
