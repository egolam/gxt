import { Header } from "../../components/header";
import { Sidebar } from "../../components/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex flex-1 border-t border-ghost">
        <Sidebar />
        <main className="flex-1 flex flex-col justify-between">{children}</main>
      </div>
    </>
  );
}
