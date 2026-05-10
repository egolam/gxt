import Image from "next/image";
import bg from "@/assets/bg.webp";

export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src={bg.src}
        alt="background image"
        fill
        priority
        className="scale-110 object-cover blur brightness-25"
      />
    </div>
  );
};
