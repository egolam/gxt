import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="p-4 text-xs flex flex-col gap-4 text-ghost font-semibold">
      <div className="flex justify-center gap-2 leading-none">
        <Link href="/" className="hover:underline">
          About
        </Link>
        <Link href="/" className="hover:underline">
          Contact
        </Link>
        <Link href="/" className="hover:underline">
          Disclaimer
        </Link>
      </div>
      <p className="leading-none text-xs text-center">
        © 2026 Satisguessry. All Rights Reserved.
      </p>
    </footer>
  );
};
