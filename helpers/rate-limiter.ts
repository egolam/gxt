import { redis } from "@/lib/redis";

interface RateLimitConfig {
  limit: number; // Max allowed requests
  windowSeconds: number; // Time window size
}

/**
 * Checks if a user/IP has exceeded their rate limit for a specific route.
 */
export async function isRateLimited(
  identifier: string,
  routeKey: string,
  config: RateLimitConfig,
): Promise<{ success: boolean; current: number; limit: number }> {
  const key = `ratelimit:${routeKey}:${identifier}`;
  const { limit, windowSeconds } = config;

  // Multi/Pipeline ensures both commands execute sequentially on the server
  const pipeline = redis.pipeline();
  pipeline.incr(key);
  pipeline.ttl(key);

  const results = await pipeline.exec();
  if (!results) {
    return { success: false, current: 0, limit }; // Fallback safety
  }

  // ioredis returns results as [error, result]
  const currentCount = results[0][1] as number;
  const currentTtl = results[1][1] as number;

  // If it's a brand new key (TTL is -1), set the expiration window
  if (currentCount === 1 || currentTtl === -1) {
    await redis.expire(key, windowSeconds);
  }

  return {
    success: currentCount <= limit,
    current: currentCount,
    limit,
  };
}
