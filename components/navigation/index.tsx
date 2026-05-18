import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaPlay, FaTrophy, FaIdCard } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const navigation = [
  { id: 0, href: "/play", display: "PLAY", icon: <FaPlay /> },
  {
    id: 1,
    href: "/leaderboard",
    display: "Leaderboard",
    icon: <FaTrophy />,
  },
  { id: 2, href: "/profile", display: "Profile", icon: <FaIdCard /> },
  { id: 3, href: "/stats", display: "Stats", icon: <IoIosStats /> },
];

export const Navigation = () => {
  return (
    <nav>
      <ul className="grid sm:grid-cols-4 gap-0.5">
        {navigation.map((link) => (
          <li key={link.id}>
            <Link
              href="/play"
              className={cn(
                "relative flex items-center justify-center h-24 sm:h-64 transition-colors duration-75 border border-white/20 text-white/50 hover:text-white hover:bg-white/5 active:text-white active:bg-white/5",
              )}
            >
              {link.icon}
              <span className="text-sm sm:text-base block absolute right-2 bottom-2 leading-none font-semibold">
                {link.display}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
