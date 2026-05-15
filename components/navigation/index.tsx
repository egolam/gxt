import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaPlay, FaTrophy, FaIdCard } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const navigation = [
  { id: 0, href: "/play", display: "PLAY", icon: <FaPlay size={20} /> },
  {
    id: 1,
    href: "/leaderboard",
    display: "Leaderboard",
    icon: <FaTrophy size={20} />,
  },
  { id: 2, href: "/profile", display: "Profile", icon: <FaIdCard size={20} /> },
  { id: 3, href: "/stats", display: "Stats", icon: <IoIosStats size={20} /> },
];

export const Navigation = () => {
  return (
    <nav>
      <ul className="grid grid-cols-2 grid-rows-2 border border-border">
        {navigation.map((link) => (
          <li key={link.id}>
            <Link
              href="/play"
              className={cn(
                "relative flex items-center justify-center h-24 lg:h-32 bg-card-bg text-text hover:text-white transition-colors duration-75 border-border inset-shadow-sm inset-shadow-secondary/50 hover:bg-ficsit-secondary",
                link.id === 0 && "border-r border-b",
                link.id === 1 && "border-b",
                link.id === 2 && "border-r",
                link.id === 3 && "",
              )}
            >
              {link.icon}
              <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium tracking-wide">
                {link.display}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
