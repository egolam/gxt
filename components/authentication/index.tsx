import { FaGithub, FaGoogle, FaTwitch } from "react-icons/fa";

export const Authentication = () => {
  return (
    <div className="flex flex-col gap-2">
      <button className="flex items-center justify-center gap-2 border-border border text-text hover:bg-feature hover:cursor-pointer hover:text-white font-medium bg-card-bg h-8 inset-shadow-sm inset-shadow-secondary/50 text-sm">
        <FaGithub />
        Join with GitHub
      </button>
      <button className="flex items-center justify-center gap-2 border-border border text-text hover:bg-feature hover:cursor-pointer hover:text-white font-medium bg-card-bg h-8 inset-shadow-sm inset-shadow-secondary/50 text-sm">
        <FaGoogle />
        Join with Google
      </button>
      <button className="flex items-center justify-center gap-2 border-border border text-text hover:bg-feature hover:cursor-pointer hover:text-white font-medium bg-card-bg h-8 inset-shadow-sm inset-shadow-secondary/50 text-sm">
        <FaTwitch />
        Join with Twitch
      </button>
    </div>
  );
};
