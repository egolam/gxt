import Link from "next/link";

export const Header = () => {
  return (
    <header className="">
      <h1 className="leading-none">
        <Link
          href="/"
          className="leading-none text-2xl font-semibold text-white block"
        >
          SATISGUESSRY
        </Link>
      </h1>
    </header>
  );
};
