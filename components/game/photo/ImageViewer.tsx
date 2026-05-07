"use client";
import Image from "next/image";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";

export const ImageViewer = ({ src }: { src: string }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full -z-10">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card-bg">
          <FaGear className="animate-spin text-text" />
        </div>
      )}
      <Image
        alt="in-game photo"
        src={`https://assets.satisguessry.com/compressed/${src}.webp`}
        fill
        quality={100}
        loading="lazy"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};
