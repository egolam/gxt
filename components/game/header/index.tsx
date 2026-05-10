// import { Heading } from "@/components/shared/Heading";
// import { useGame } from "@/hooks/use-game";
// import { cn } from "@/lib/utils";
// import { useParams } from "next/navigation";

// export const InGameHeader = () => {
//   const { gameslug } = useParams();
//   const { data } = useGame(gameslug as string);
//   return (
//     <>
//       {data?.game.phase === "game_end" && (
//         <h1 className={cn("text-2xl font-bold text-ghost flex-1")}>RESULTS</h1>
//       )}
//       <h1
//         className={cn(
//           "text-2xl font-bold text-ficsit-primary flex-1",
//           data?.game.phase === "game_end" && "text-right",
//         )}
//       >
//         <Heading long={false} />
//       </h1>
//     </>
//   );
// };
