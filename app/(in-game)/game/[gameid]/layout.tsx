export default function InGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 flex sm:items-center sm:justify-center">
      {children}
    </main>
  );
}
