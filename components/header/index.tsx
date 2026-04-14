import Link from "next/link";
import { Heading } from "../shared/Heading";
import { Greeting } from "./Greeting";

export const Header = () => {
  return (
    <header className="flex h-16 px-4 justify-between items-center">
      <h1
        className={`text-ficsit-primary text-2xl font-bold leading-none w-fit`}
      >
        <Link href="/" className="block">
          <Heading />
        </Link>
      </h1>
      <Greeting />
    </header>
  );
};
