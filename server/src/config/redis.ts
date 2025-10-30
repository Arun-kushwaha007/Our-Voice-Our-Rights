import { createClient } from "redis";
import { REDIS_URL } from "./env";
import { logger } from "../utils/logger";

const redisClient = createClient({ url: REDIS_URL });

redisClient.on("error", (err) => logger.error("Redis Client Error", err));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info("Redis connected");
  } catch (err) {
    logger.error("Failed to connect to Redis", err);
  }
};

export default redisClient;
