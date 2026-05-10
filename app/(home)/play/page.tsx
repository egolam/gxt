import { GameModeSelection } from "@/components/gamemode";

export default function PlayPage() {
  return (
    <section className="sm:gap-8 justify-center flex-1">
      {/* <h2 className="text-white sm:text-2xl uppercase font-bold leading-none hidden">
        Select<span className="text-ficsit-primary">GameMode</span>
      </h2> */}
      <div className="flex flex-col gap-2 w-full h-full py-8">
        <div className="bg-ghost h-full"></div>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-ghost text-text font-semibold h-8">
            PREVIOUS
          </button>
          <button className="bg-ghost text-text font-semibold h-8">NEXT</button>
          <button className="col-span-2 h-12 bg-ficsit-primary text-white font-bold text-2xl">
            START
          </button>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="flex flex-col items-center">
        <div className="flex gap-2 justify-between sm:justify-normal">
          <GameModeSelection />
        </div>
      </div> */
}
