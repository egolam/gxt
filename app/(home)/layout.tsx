import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-5xl w-lg bg-secondary md:min-h-184 flex flex-col md:justify-normal p-6 md:p-8 gap-2 md:gap-4 relative border-b-4 border-ficsit-primary">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
