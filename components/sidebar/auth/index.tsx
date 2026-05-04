"use client";

import { authClient } from "@/lib/auth-client";
import { SignOut } from "./SignOut";
import { FaGithub, FaGoogle, FaTwitch } from "react-icons/fa";
import { SignIn } from "./SignIn";
import { usePathname } from "next/navigation";

const socialProviders = [
  {
    id: 0,
    display: "GitHub",
    value: "github",
    icon: <FaGithub />,
    enabled: true,
  },
  {
    id: 1,
    display: "Google",
    value: "google",
    icon: <FaGoogle />,
    enabled: false,
  },
  {
    id: 2,
    display: "Twitch",
    value: "twitch",
    icon: <FaTwitch />,
    enabled: false,
  },
];

export const Auth = () => {
  const { data: session, isPending, isRefetching } = authClient.useSession();
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-1 border-t border-ghost gap-4 p-4">
      {isPending || isRefetching ? (
        <p className="text-text animate-pulse">Loading...</p>
      ) : !session || session.user.isAnonymous ? (
        socialProviders.map((provider) => (
          <SignIn
            key={provider.id}
            enabled={provider.enabled}
            value={provider.value}
            icon={provider.icon}
            display={provider.display}
            redirect={pathname}
          />
        ))
      ) : (
        <SignOut />
      )}
    </div>
  );
};
