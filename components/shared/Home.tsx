"use client";

import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

export const Home = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="size-8 flex items-center justify-center hover:cursor-pointer transition-all duration-75 text-white hover:text-ficsit-secondary active:text-ficsit-secondary"
    >
      <FaHome size={20} />
      <p className="sr-only">back to home page</p>
    </button>
  );
};
