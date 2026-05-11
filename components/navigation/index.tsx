import Link from "next/link";
import { FaPlay, FaTrophy, FaIdCard } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

export const Navigation = () => {
  return (
    <nav>
      <ul className="grid grid-cols-2 grid-rows-2 border border-border text-text">
        <li>
          <Link
            href="/play"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-b border-r border-border hover:text-white"
          >
            <FaPlay size={20} />
            <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium">
              PLAY
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/leaderboard"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-b border-border hover:text-white"
          >
            <FaTrophy size={20} />
            <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium">
              Leaderboard
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-r border-border hover:text-white"
          >
            <FaIdCard size={20} />
            <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium">
              Profile
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/stats"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-border hover:text-white"
          >
            <IoIosStats size={20} />
            <span className="text-sm md:text-base block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none font-medium">
              Stats
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
