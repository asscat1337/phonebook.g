import { Redis } from "ioredis";
import { logger } from "../pino";

export const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
});

redis.on("connect", () => {
  logger.info("Connected to redis");
});

redis.on("close", () => {
  logger.info("Closing connect to redis...");
});

redis.on("error", (e: Error) => {
  logger.error(`Redis error: ${e.message}`);
});
