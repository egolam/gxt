import "dotenv/config";
import { anonymousClient, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
export const authClient = createAuthClient({
  plugins: [anonymousClient(), adminClient(), nextCookies()],
  baseURL: process.env.BETTER_AUTH_URL!,
});
