import Link from "next/link";
import { FaPlay, FaTrophy, FaIdCard } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

export const Navigation = () => {
  return (
    <nav>
      <ul className="grid grid-cols-2 grid-rows-2 border border-border text-white">
        <li>
          <Link
            href="/play"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-b border-r border-border group"
          >
            <FaPlay size={20} />
            <span className="block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none text-text group-hover:text-white font-medium">
              PLAY
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-b border-border group"
          >
            <FaTrophy size={20} />
            <span className="block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none text-text group-hover:text-white font-medium">
              Leaderboard
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-r border-border group"
          >
            <FaIdCard size={20} />
            <span className="block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none text-text group-hover:text-white font-medium">
              Profile
            </span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="relative flex items-center justify-center h-24 lg:h-32 bg-card-bg hover:bg-feature inset-shadow-sm inset-shadow-secondary/50 border-border group"
          >
            <IoIosStats size={20} />
            <span className="block absolute right-1 lg:right-2 bottom-1 lg:bottom-2 leading-none text-text group-hover:text-white font-medium">
              Stats
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
