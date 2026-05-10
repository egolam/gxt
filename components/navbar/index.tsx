import Link from "next/link";

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center justify-center bg-ghost text-white font-semibold uppercase">
        <li className="flex">
          <Link
            className="w-32 h-8 flex items-center justify-center hover:underline"
            href="/"
          >
            HOME
          </Link>
        </li>
        <li className="flex">
          <Link
            className="w-32 h-8 flex items-center justify-center hover:underline"
            href="/"
          >
            PLAY
          </Link>
        </li>
        <li className="flex">
          <Link
            className="w-32 h-8 flex items-center justify-center hover:underline"
            href="/"
          >
            Leaderboard
          </Link>
        </li>
        <li className="flex">
          <Link
            className="w-32 h-8 flex items-center justify-center hover:underline"
            href="/"
          >
            Profile
          </Link>
        </li>
        <li className="flex">
          <Link
            className="w-32 h-8 flex items-center justify-center hover:underline"
            href="/"
          >
            HOW TO PLAY
          </Link>
        </li>
        <li className="flex">
          <Link
            className="w-32 h-8 flex items-center justify-center hover:underline"
            href="/"
          >
            SIGN IN
          </Link>
        </li>
      </ul>
    </nav>
  );
};
