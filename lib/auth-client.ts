import "dotenv/config";
import { anonymousClient, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [anonymousClient(), adminClient()],
  baseURL: process.env.BETTER_AUTH_URL!,
});
