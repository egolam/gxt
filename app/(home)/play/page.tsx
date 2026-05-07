import { GameModeSelection } from "@/components/gamemode";

export default function PlayPage() {
  return (
    <section className="flex flex-col items-center gap-8 justify-center flex-1">
      <h2 className="text-white text-2xl uppercase font-bold leading-none">
        Select <span className="text-ficsit-primary">Game Mode</span>
      </h2>
      <div className="flex flex-col items-center gap-2">
        <div className="flex">
          <GameModeSelection />
        </div>
      </div>
    </section>
  );
}
