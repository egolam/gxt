"use client";

import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { FaPlay } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export const Start = () => {
  const { pending } = useFormStatus();
  const sp = useSearchParams();
  const errorMessage = sp?.get("error");

  return (
    <>
      <button
        disabled={pending}
        type="submit"
        className="flex items-center justify-center gap-2 border-border border text-text hover:bg-feature hover:cursor-pointer hover:text-white font-medium bg-card-bg h-8 inset-shadow-sm inset-shadow-secondary/50 text-sm w-full disabled:pointer-events-none disabled:opacity-50"
      >
        {pending ? (
          <FaGear className="animate-spin" />
        ) : (
          <>
            <FaPlay />
            START
          </>
        )}
      </button>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};
