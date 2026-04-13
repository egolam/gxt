"use server";

import { authClient } from "@/lib/auth-client";

export async function github() {
  const data = await authClient.signIn.social({
    provider: "github",
  });
  console.log(data);
}
