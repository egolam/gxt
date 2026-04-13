import { github } from "@/actions/auth/github";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { FaGithub } from "react-icons/fa";

export const GithubButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };
  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await handleSignIn();
        });
      }}
      className="bg-ghost text-text py-1 flex items-center gap-2 justify-center font-bold hover:cursor-pointer hover:underline underline-offset-2 disabled:opacity-25 disabled:pointer-events-none"
    >
      {isPending ? (
        "Loading"
      ) : (
        <>
          <FaGithub /> Join with GitHub
        </>
      )}
    </button>
  );
};
