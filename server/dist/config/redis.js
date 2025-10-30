"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = void 0;
const redis_1 = require("redis");
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
const redisClient = (0, redis_1.createClient)({ url: env_1.REDIS_URL });
redisClient.on("error", (err) => logger_1.logger.error("Redis Client Error", err));
const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger_1.logger.info("Redis connected");
    }
    catch (err) {
        logger_1.logger.error("Failed to connect to Redis", err);
    }
};
exports.connectRedis = connectRedis;
exports.default = redisClient;
