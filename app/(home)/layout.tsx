import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-5xl w-lg sm:min-h-184 flex flex-col sm:justify-normal relative bg-background overflow-hidden drop-shadow-md drop-shadow-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
