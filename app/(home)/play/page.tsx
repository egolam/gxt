import { GameModeSelection } from "@/components/gamemode";

export default function PlayPage() {
  return (
    <section className="flex flex-col items-center gap-8 justify-center flex-1">
      <h2 className="text-text text-2xl uppercase font-bold leading-none">
        Select <span className="text-ficsit-primary">Game Mode</span>
      </h2>
      <GameModeSelection />
    </section>
  );
}
