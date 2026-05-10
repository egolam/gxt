import Link from "next/link";
import { Heading } from "../shared/Heading";
import { FaSignInAlt } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="flex justify-between items-center h-16 px-4">
      <h1
        className={`text-2xl sm:text-[2rem] font-bold leading-none w-fit -mt-1`}
      >
        <Link href="/" className="block">
          <Heading long={false} />
        </Link>
      </h1>

      <nav>
        <ul>
          <li>
            <Link
              className="flex items-center justify-center font-bold text-text hover:text-white h-8 gap-2"
              href="/join"
            >
              <FaSignInAlt />
              <span className="mt-0.5 sm:text-xl">SIGN IN</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
