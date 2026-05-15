import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export async function signInAnonymously() {
  let userId: string;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const anonymous = await auth.api.signInAnonymous({
      headers: await headers(),
    });

    if (!anonymous) {
      return false;
    }
    userId = anonymous.user.id;
  } else {
    userId = session.user.id;
  }

  return { userId };
}
