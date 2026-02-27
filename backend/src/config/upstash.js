import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import "dotenv/config";

const hasUpstashEnv =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

// In local/dev environments this project may only have a `REDIS_URL` (TCP) set.
// Upstash Ratelimit uses the Upstash REST credentials, so we gracefully disable
// rate limiting if they are not provided.
const ratelimit = hasUpstashEnv
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(100, "60 s"),
    })
  : {
      limit: async () => ({ success: true, reset: 0, remaining: Infinity, limit: Infinity }),
    };

export default ratelimit;
