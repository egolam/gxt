import { Monomaniac_One } from "next/font/google";

const turret = Monomaniac_One({
  weight: ["400"],
  subsets: ["latin"],
});
export const Heading = () => {
  return <span className={`${turret.className} block leading-none`}>S4T1S-GU3SSR-Y</span>;
};
