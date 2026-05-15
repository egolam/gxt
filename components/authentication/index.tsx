import { cn } from "@/lib/utils";
import { FaGithub, FaGoogle, FaTwitch } from "react-icons/fa";

const socialProviders = [
  { id: 0, provider: "github", display: "GitHub", icon: <FaGithub /> },
  { id: 1, provider: "google", display: "Google", icon: <FaGoogle /> },
  { id: 2, provider: "twitch", display: "Twitch", icon: <FaTwitch /> },
];

export const Authentication = () => {
  return (
    <ul className="flex flex-col border border-border">
      {socialProviders.map((provider) => (
        <li key={provider.id}>
          <button
            className={cn(
              "w-full flex items-center justify-center gap-2 hover:cursor-pointer font-medium h-8 text-sm transition-colors duration-75 bg-card-bg hover:bg-ficsit-secondary hover:text-white inset-shadow-sm inset-shadow-secondary/50 text-text border-border tracking-wide",
              provider.id === 1 && "border-y",
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
