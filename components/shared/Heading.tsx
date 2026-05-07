import { Monomaniac_One } from "next/font/google";

const turret = Monomaniac_One({
  weight: ["400"],
  subsets: ["latin"],
});
export const Heading = () => {
  return (
    <span className={`${turret.className} block leading-none text-white`}>
      SATIS<span className="text-ficsit-primary leading-none inline-block">GUESSRY</span>
    </span>
  );
};
