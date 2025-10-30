// import redisClient from "../config/redis";
// import { logger } from "../utils/logger";

// export const getCache = async (key: string) => {
//   try {
//     const data = await redisClient.get(key);
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     logger.error(`Error getting cache for key ${key}:`, err);
//     return null;
//   }
// };

// export const setCache = async (key: string, data: any, ttl: number) => {
//   try {
//     await redisClient.set(key, JSON.stringify(data), { EX: ttl });
//   } catch (err) {
//     logger.error(`Error setting cache for key ${key}:`, err);
//   }
// };
