interface Props {
  distance: number;
  score: number;
}

export const RoundEndBoard = ({ distance, score }: Props) => {
  return (
    <div className="flex justify-center items-center h-fit gap-4 px-4 bg-card-bg py-2 leading-none">
      <div className="flex items-center justify-center gap-2 border-r border-border pr-4">
        <h2 className="text-text font-semibold">DISTANCE:</h2>
        <p className="font-bold text-white uppercase">
          {distance} <span className="lowercase">meters</span>
        </p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <h2 className="text-text font-semibold">ROUND SCORE:</h2>
        <p className="font-bold text-white">{score}</p>
      </div>
    </div>
  );
};
