import Link from "next/link";
import { Heading } from "../../components/shared/Heading";
import { InfoBar } from "../../components/shared/InfoBar";

export default function HomePage() {
  return (
    <>
      <div className="flex-1 flex">
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <div className="flex flex-col items-center justify-center leading-none">
            <p className="text-feature font-medium">Welcome to</p>
            <h3 className="text-[2rem] text-ficsit-primary font-bold">
              <Heading />
            </h3>
            <p className="text-xl font-semibold text-text pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
              at? Voluptatibus, ratione.
            </p>
          </div>
          <Link
            href="/play"
            className="text-2xl bg-ficsit-primary text-white font-bold w-64 h-16 flex items-center justify-center text-shadow-xs text-shadow-feature relative group"
          >
            PLAY NOW
            <span className="h-0 w-full bg-ficsit-secondary absolute bottom-0 group-hover:h-1 transition-[height]"></span>
          </Link>
        </div>
        <InfoBar />
      </div>

      <div className="border-t border-ghost flex items-center divide-x divide-ghost w-full">
        <div className="flex flex-col gap-2 items-center flex-1 p-4">
          <h4 className="text-feature font-medium">Total Games Played</h4>
          <p className="text-ficsit-primary text-xl font-bold">4589</p>
        </div>
        <div className="flex flex-col gap-2 items-center flex-1 p-4">
          <h4 className="text-feature font-medium">Unique Locations</h4>
          <p className="text-ficsit-primary text-xl font-bold">2164</p>
        </div>
        <div className="flex flex-col gap-2 items-center flex-1 p-4">
          <h4 className="text-feature font-medium">Total Pioneers</h4>
          <p className="text-ficsit-primary text-xl font-bold">154</p>
        </div>
      </div>
    </>
  );
}
