"use client";

import { authClient } from "@/lib/auth-client";

export const Greeting = () => {
  const { data: session } = authClient.useSession();

  return (
    <p className="text-ficsit-primary leading-none capitalize">
      {!session
        ? "Greetings, Pioneer Candidate"
        : `Greetings, ${session.user.name}`}
    </p>
  );
};
