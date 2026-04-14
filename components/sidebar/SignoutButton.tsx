import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { RiSettings4Fill } from "react-icons/ri";
import { ImExit } from "react-icons/im";

export const SignoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    if (isLoading) return;
    const { data, error } = await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
        },
        onError: (err) => {
          setIsLoading(false);
        },
      },
    });
  };

  return (
    <button
      onClick={async () => await handleSignOut()}
      disabled={isLoading}
      className="h-8 bg-red-500 text-white flex items-center gap-2 justify-center font-bold hover:cursor-pointer hover:underline underline-offset-2 disabled:opacity-25 disabled:pointer-events-none"
    >
      {isLoading ? (
        <RiSettings4Fill className="animate-spin" />
      ) : (
        <>
          <ImExit /> Leave
        </>
      )}
    </button>
  );
};
