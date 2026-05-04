import Link from "next/link";
import { IoWarning } from "react-icons/io5";

export default function AuthError() {
  return (
    <div className="w-full flex flex-col items-center justify-center flex-1">
      <div className="flex flex-col gap-2 items-center">
        <IoWarning className="size-8 text-red-500" />
        <h3 className="text-[2rem] font-bold text-red-500 leading-none">
          AUTHENTICATION ERROR
        </h3>
        <Link
          href="/play"
          className="text-2xl w-64 h-8 leading-none flex items-center justify-center text-text hover:underline font-bold"
        >
          RETURN TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
}
