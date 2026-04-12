export const InfoBar = () => {
  return (
    <aside className="w-64 h-full border-l border-ghost p-4">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-text leading-none pb-4">
          Employee of the Planet
        </h3>
        <div className="flex flex-col border-y border-ghost py-4">
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Game Mode:</p>
            <p className="text-ficsit-blue font-semibold">CASUAL</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Pioneer:</p>
            <p className="text-ficsit-blue font-semibold">Pioneer-1</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Score:</p>
            <p className="text-ficsit-blue font-semibold">9854</p>
          </div>
        </div>
        <div className="flex flex-col border-b border-ghost py-4 relative">
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Game Mode:</p>
            <p className="text-ficsit-blue font-semibold">COUNTDOWN</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Pioneer:</p>
            <p className="text-ficsit-blue font-semibold">Pioneer-458</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Score:</p>
            <p className="text-ficsit-blue font-semibold">9854</p>
          </div>
          {/* <div className="flex items-center gap-2 text-xs absolute bottom-0 left-1/2 -translate-x-1/2 text-text">
            <p className="text-text">Round duration:</p>
            <p className="text-ficsit-blue">3sec</p>
          </div> */}
        </div>
        <div className="flex flex-col border-b border-ghost py-4">
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Game Mode:</p>
            <p className="text-ficsit-blue font-semibold">SURVIVE</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Pioneer:</p>
            <p className="text-ficsit-blue font-semibold">Pioneer-1</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-text font-medium">Streak:</p>
            <p className="text-ficsit-blue font-semibold">984</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
