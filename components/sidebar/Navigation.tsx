"use client";
import { FaPlay, FaQuestion, FaUser, FaHome } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { id: 5, href: "/", display: "Home", icon: <FaHome /> },
  { id: 0, href: "/play", display: "PLAY", icon: <FaPlay /> },
  {
    id: 1,
    href: "/leaderboard",
    display: "Leaderboard",
    icon: <MdLeaderboard />,
  },
  { id: 2, href: "/profile", display: "Profile", icon: <FaUser /> },
  { id: 3, href: "/settings", display: "Settings", icon: <RiSettings4Fill /> },
  { id: 4, href: "/how-to-play", display: "How to Play", icon: <FaQuestion /> },
];

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <ul>
      {nav.map((link) => (
        <li key={link.id} className="flex">
          <Link
            href={link.href}
            className={cn(
              "text-text flex-1 h-12 w-64 flex items-center gap-2 px-4 font-bold hover:text-ficsit-secondary",
              pathname === link.href && "pointer-events-none",
            )}
          >
            {link.icon}
            {link.display}
            {pathname === link.href && (
              <span className="size-1 bg-ficsit-primary ml-auto rounded-full"></span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};