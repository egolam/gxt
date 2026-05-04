import { InfoBar } from "@/components/infobar";
import { Sidebar } from "../../components/sidebar";
import { Header } from "@/components/header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 flex flex-col justify-between">{children}</main>
        <InfoBar />
      </div>
    </>
  );
}
