import Link from "next/link";
import { Home } from "../shared/Home";
import { Heading } from "./Heading";

export const Header = () => {
  return (
    <header className="flex items-center justify-between bg-ficsit-primary shadow-md shadow-black border-b-4 border-ficsit-secondary h-16 px-4">
      <h1 className="leading-none">
        <Link
          href="/"
          className="leading-none text-2xl font-semibold text-white"
        >
          <Heading long={true} />
        </Link>
      </h1>
      <Home />
    </header>
  );
};
