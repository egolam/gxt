import { FaGithub, FaGoogle, FaTwitch } from "react-icons/fa";

export const AuthButtons = () => {
  return (
    <div className="border-t border-ghost flex-1 flex flex-col gap-4 p-4">
      <button className="bg-ghost text-text py-1 flex items-center gap-2 justify-center font-bold hover:cursor-pointer hover:underline underline-offset-2 disabled:opacity-25 disabled:pointer-events-none">
        <FaGithub /> Join with GitHub
      </button>
      <button className="bg-ghost text-text py-1 flex items-center gap-2 justify-center font-bold hover:cursor-pointer hover:underline underline-offset-2 disabled:opacity-25 disabled:pointer-events-none">
        <FaGoogle /> Join with Google
      </button>
      <button className="bg-ghost text-text py-1 flex items-center gap-2 justify-center font-bold hover:cursor-pointer hover:underline underline-offset-2 disabled:opacity-25 disabled:pointer-events-none">
        <FaTwitch /> Join with Twitch
      </button>
      <p className="text-xs font-semibold text-ghost italic text-center">
        You can play the game without creating an account. Your progress and
        scores will still be saved, but they will be stored only on this device.
        If you switch devices or clear your browser data, you may lose access to
        your anonymous account and its progress. You can create an account or
        link your existing one at any time to securely save and access your
        scores across devices.
      </p>
    </div>
  );
};
