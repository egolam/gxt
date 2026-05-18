import { cn } from "@/lib/utils";
import { FaGithub, FaGoogle, FaTwitch } from "react-icons/fa";

const socialProviders = [
  { id: 0, provider: "github", display: "GitHub", icon: <FaGithub /> },
  { id: 1, provider: "google", display: "Google", icon: <FaGoogle /> },
  { id: 2, provider: "twitch", display: "Twitch", icon: <FaTwitch /> },
];

export const Authentication = () => {
  return (
    <ul className="flex flex-col gap-0.5">
      {socialProviders.map((provider) => (
        <li key={provider.id}>
          <button
            className={cn(
              "w-full flex items-center justify-center gap-2 hover:cursor-pointer font-medium h-8 text-sm transition-colors duration-75 border border-white/20 text-white/50 hover:text-white hover:bg-white/5 active:text-white active:bg-white/5",
            )}
          >
            {provider.icon}
            Join with {provider.display}
          </button>
        </li>
      ))}
    </ul>
  );
};
