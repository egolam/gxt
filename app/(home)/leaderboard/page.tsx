import Link from "next/link";

export default function LeaderboardPage() {
  return (
    <section className="flex flex-col items-center gap-8 justify-center flex-1">
      <h2 className="text-white text-2xl uppercase font-bold leading-none">
        LEADER<span className="text-ficsit-primary">BOARD</span>
      </h2>
      <div>
        <div className="flex gap-4">
          <p className="text-">GAME MODE:</p>
          <div className="flex gap-4">
            <Link
              className="bg-ghost text-text w-32 h-12 flex items-center justify-center font-bold"
              href="/leaderboard?mode=casual"
            >
              CASUAL
            </Link>
            <Link
              className="bg-ghost text-text w-32 h-12 flex items-center justify-center font-bold"
              href="/leaderboard?mode=countdown"
            >
              COUNTDOWN
            </Link>
            <Link
              className="bg-ghost text-text w-32 h-12 flex items-center justify-center font-bold"
              href="/leaderboard?mode=survive"
            >
              SURVIVE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
