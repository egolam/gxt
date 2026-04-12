import Link from "next/link";
import { Heading } from "../shared/Heading";

export const Header = () => {
  return (
    <header className="flex p-4 justify-between items-center">
      <h1
        className={`text-ficsit-primary text-2xl font-bold leading-none w-fit`}
      >
        <Link href="/" className="block">
          <Heading />
        </Link>
      </h1>
      <p className="text-ficsit-primary leading-none">Greetings, Pioneer-???</p>
    </header>
  );
};
