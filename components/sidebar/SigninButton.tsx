import { authClient } from "@/lib/auth-client";
import { JSX, useState } from "react";
import { RiSettings4Fill } from "react-icons/ri";

export const SigninButton = ({
  enabled,
  value,
  display,
  icon,
}: {
  enabled: boolean;
  value: string;
  icon: JSX.Element;
  display: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (value: string) => {
    if (isLoading) return;
    const { data, error } = await authClient.signIn.social(
      {
        provider: value,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (err) => {
          setIsLoading(false);
        },
        onRequest: () => {
          setIsLoading(true);
        },
      },
    );
  };

  return (
    <button
      onClick={async () => await handleSignIn(value)}
      disabled={!enabled || isLoading}
      className="h-8 bg-ghost text-text flex items-center gap-2 justify-center font-bold hover:cursor-pointer hover:underline underline-offset-2 disabled:opacity-25 disabled:pointer-events-none"
    >
      {isLoading ? (
        <RiSettings4Fill className="animate-spin" />
      ) : (
        <>
          {icon} Join with {display}
        </>
      )}
    </button>
  );
};
