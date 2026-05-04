"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlay, FaQuestion, FaUser, FaHome } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiSettings4Fill } from "react-icons/ri";

const iconMap: Record<string, any> = {
  home: FaHome,
  play: FaPlay,
  leaderboard: MdLeaderboard,
  user: FaUser,
  settings: RiSettings4Fill,
  question: FaQuestion,
};

export const NavigationLinks = ({
  display,
  href,
  iconKey,
}: {
  href: string;
  iconKey: string;
  display: string;
}) => {
  const pathname = usePathname();
  const Icon = iconMap[iconKey];
  return (
    <Link
      href={href}
      className={cn(
        "text-text flex-1 h-12 w-64 flex items-center gap-2 px-4 font-bold hover:text-ficsit-secondary",
        pathname === href && "pointer-events-none",
      )}
    >
      {Icon && <Icon />}
      {display}
      {pathname === href && (
        <span className="size-1 bg-ficsit-primary ml-auto rounded-full"></span>
      )}
    </Link>
  );
};
