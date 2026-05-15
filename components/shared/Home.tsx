"use client";

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export const Home = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="size-8 text-text border border-border bg-card-bg hover:text-white flex items-center justify-center hover:cursor-pointer transition-colors duration-75 hover:bg-ficsit-secondary inset-shadow-sm inset-shadow-secondary/50"
    >
      <FaHome className="mt-0.5" />
      <p className="sr-only">back to home page</p>
    </button>
  );
};
