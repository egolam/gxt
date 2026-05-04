import React from "react";

export const Countdown = () => {
  return (
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
  );
};
