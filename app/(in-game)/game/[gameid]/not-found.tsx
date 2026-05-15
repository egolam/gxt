import Link from "next/link";
import { IoWarning } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 items-center bg-secondary p-4 border border-border">
        <IoWarning className="size-8 text-red-500" />
        <h3 className="text-[2rem] font-bold text-red-500 leading-none">
          GAME NOT FOUND!
        </h3>
        <Link
          href="/play"
          className="text-2xl w-64 h-8 leading-none flex items-center justify-center text-text hover:underline font-bold bg-card-bg border border-border"
        >
          RETURN TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
}
