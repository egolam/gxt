import { Header } from "@/components/header";
import { Divider } from "@/components/shared/Divider";
import { Footer } from "@/components/footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-5xl w-lg bg-secondary flex flex-col justify-center md:justify-normal p-6 md:p-8 gap-2 md:gap-4">
      <Header />
      {children}
      <Divider>footer</Divider>
      <Footer />
    </div>
  );
}
