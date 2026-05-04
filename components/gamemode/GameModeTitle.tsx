export const GameModeTitle = ({ display }: { display: string }) => {
  return (
    <div className="bg-ficsit-primary px-5 py-2 flex flex-col justify-center gap-1 text-white max-w-fit shadow-md shadow-secondary">
      <p className="leading-none">Game Mode:</p>
      <h2 className="leading-none text-xl font-semibold tracking-wider">
        {display}
      </h2>
    </div>
  );
};
