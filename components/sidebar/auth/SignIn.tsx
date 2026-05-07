import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { toast } from "sonner";

export const SignIn = ({
  enabled,
  value,
  display,
  icon,
  redirect,
}: {
  enabled: boolean;
  value: string;
  icon: JSX.Element;
  display: string;
  redirect: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (value: string) => {
    if (isLoading) return;
    await authClient.signIn.social(
      {
        provider: value,
        callbackURL: redirect,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (err) => {
          setIsLoading(false);
          router.push("/auth-error");
          toast.error("Something went wrong");
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
