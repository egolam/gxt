import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { admin, anonymous } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { gameSessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redisStorage } from "@better-auth/redis-storage";
import { redis } from "./redis";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        await db
          .update(gameSessions)
          .set({
            userId: newUser.user.id,
          })
          .where(eq(gameSessions.userId, anonymousUser.user.id));
      },
    }),
    admin(),
    nextCookies(),
  ],
  trustedOrigins: ["http://localhost:3000", "https://satisguessry.com"],
  secret: process.env.BETTER_AUTH_SECRET!,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60, // 1 minute
    },
  },
  secondaryStorage: redisStorage({ client: redis, keyPrefix: "better-auth:" }),
  rateLimit: {
    storage: "secondary-storage",
    enabled: true,
    window: 60,
    max: 100,
  },
});
