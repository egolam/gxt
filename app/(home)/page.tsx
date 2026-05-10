import Link from "next/link";
import { Heading } from "../../components/shared/Heading";
import { MdLeaderboard } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex flex-col items-center justify-center leading-none">
        <p className="text-feature font-medium sm:text-xl">Welcome to</p>
        <h2 className="text-[2rem] font-bold ">
          <Heading long={true} />
        </h2>
        <p className="text-base sm:text-xl font-semibold text-text pt-4 text-center text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, at?
          Voluptatibus, ratione.
        </p>
      </div>
      <nav className="w-full flex justify-center">
        <ul className="flex flex-1 justify-center">
          <li>
            <Link
              href="/play"
              className="size-12 sm:size-16 bg-card-bg text-white font-bold flex items-center justify-center relative group hover:text-ficsit-secondary"
            >
              <FaSignInAlt />
              <span className="absolute text-ghost sr-only">JOIN</span>
              {/* <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span> */}
            </Link>
          </li>
          <li className="flex-1 sm:flex-none">
            <Link
              href="/play"
              className="text-xl sm:text-2xl sm:w-64 h-12 sm:h-16 bg-ficsit-primary text-white font-bold flex items-center justify-center relative group"
            >
              PLAY
              <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span>
            </Link>
          </li>

          <li>
            <Link
              href="/play"
              className="size-12 sm:size-16 bg-card-bg text-white font-bold flex items-center justify-center relative group hover:text-ficsit-secondary"
            >
              <MdLeaderboard />
              <span className="absolute text-ghost sr-only">LEADERBOARD</span>
              {/* <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-0.75 transition-[height]"></span> */}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
