export default function InGameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-1 flex items-center justify-center">
      {children}
    </main>
  );
}
