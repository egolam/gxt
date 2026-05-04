import Link from "next/link";
import { Heading } from "../shared/Heading";

export const Header = () => {
  return (
    <header className="flex h-16 px-4 justify-between items-center border-b border-ghost">
      <h1 className={`text-2xl font-bold leading-none w-fit`}>
        <Link href="/" className="block">
          <Heading />
        </Link>
      </h1>
    </header>
  );
};
