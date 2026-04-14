"use client";

import { FaGithub, FaGoogle, FaTwitch } from "react-icons/fa";
import { JSX } from "react";
import { authClient } from "@/lib/auth-client";
import { SignoutButton } from "./SignoutButton";
import { SigninButton } from "./SigninButton";

interface ISocialProviders {
  id: number;
  display: string;
  value: string;
  icon: JSX.Element;
  enabled: boolean;
}

const socialProviders: ISocialProviders[] = [
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

export const AuthButtons = () => {
  const { data: session, isPending, isRefetching } = authClient.useSession();

  return (
    <div className="border-t border-ghost flex-1 flex flex-col gap-4 p-4">
      {session ? (
        <SignoutButton />
      ) : isPending || isRefetching ? null : (
        socialProviders.map((provider) => (
          <SigninButton
            key={provider.id}
            enabled={provider.enabled}
            value={provider.value}
            icon={provider.icon}
            display={provider.display}
          />
        ))
      )}

      {/* <p className="text-xs font-semibold text-ghost italic text-center">
        You can play the game without creating an account. Your progress and
        scores will still be saved, but they will be stored only on this device.
        If you switch devices or clear your browser data, you may lose access to
        your anonymous account and its progress. You can create an account or
        link your existing one at any time to securely save and access your
        scores across devices.
      </p> */}
    </div>
  );
};
