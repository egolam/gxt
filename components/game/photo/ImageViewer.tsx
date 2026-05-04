import Image from "next/image";

export const ImageViewer = ({ src }: { src: string }) => {
  return (
    <div className="relative w-full h-full -z-10">
      <Image
        alt="in-game photo"
        src={`https://assets.satisguessry.com/compressed/${src}.webp`}
        fill
        className=""
        loading="eager"
        quality={100}
        sizes=""
      />
    </div>
  );
};
