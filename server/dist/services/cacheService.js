"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = exports.getCache = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const logger_1 = require("../utils/logger");
const getCache = async (key) => {
    try {
        const data = await redis_1.default.get(key);
        return data ? JSON.parse(data) : null;
    }
    catch (err) {
        logger_1.logger.error(`Error getting cache for key ${key}:`, err);
        return null;
    }
};
exports.getCache = getCache;
const setCache = async (key, data, ttl) => {
    try {
        await redis_1.default.set(key, JSON.stringify(data), { EX: ttl });
    }
    catch (err) {
        logger_1.logger.error(`Error setting cache for key ${key}:`, err);
    }
};
exports.setCache = setCache;
