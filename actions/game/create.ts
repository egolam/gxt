"use server";

import { auth } from "@/lib/auth";
import { createGameSchema } from "@/schemas/game/create";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createGame(formData: FormData) {
  const result = await createGameSchema.safeParseAsync(
    Object.fromEntries(formData),
  );
  if (!result.success) {
    const params = new URLSearchParams({
      error: "invalid input",
    });

    redirect(`/play?${params.toString()}`);
  }

  let userId: string = "";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const anonymous = await auth.api.signInAnonymous({
      headers: await headers(),
    });

    if (!anonymous) {
      const params = new URLSearchParams({
        error: "unauthorized access",
      });

      redirect(`/play?${params.toString()}`);
    }
    userId = anonymous.user.id;
  } else {
    userId = session.user.id;
  }
}
