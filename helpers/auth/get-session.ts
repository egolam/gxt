import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function getSessionFromRequest(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  return session;
}
