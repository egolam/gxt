"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export async function signout() {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/");
      },
    },
  });
}
