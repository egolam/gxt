import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full lg:w-5xl">
      <Header />
      <main className="flex justify-center items-center px-4 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
