import { useState } from "react";
import { cn } from "@/lib/utils"; // Standard shadcn utility class helper
import { FaX } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import { LazyMap } from "./LazyMap";

export default function MapWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. Floating Toggle Button (Mobile Only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-4 right-4 z-9999 flex items-center justify-center md:hidden size-8 shadow shadow-background transition-transform text-white bg-ficsit-primary",
          isOpen && "bg-red-500",
        )}
      >
        {isOpen ? <FaX /> : <FaMapPin />}
      </button>

      {/* 2. Map Container Box */}
      <div
        className={cn(
          // Shared styles
          "z-999 transition-all duration-300 ease-in-out shadow-2xl overflow-hidden",

          // Mobile Styles (Hidden or full screen/bottom sheet overlay)
          "fixed bottom-4 right-4 left-4 h-[45vh] md:h-full",
          !isOpen &&
            "pointer-events-none opacity-0 translate-y-10 scale-95 md:opacity-100 md:pointer-events-auto md:translate-y-0 md:scale-100",

          // Desktop Overrides (Always visible pinned corner)
          "md:static md:flex-1 md:block",
        )}
      >
        {/* Your Leaflet Map Component Goes Here */}
        <div className="w-full h-full bg-background">
          <LazyMap />
        </div>
      </div>
    </>
  );
}
