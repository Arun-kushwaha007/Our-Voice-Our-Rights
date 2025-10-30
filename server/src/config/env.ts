import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mgnrega";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const API_KEY = process.env.API_KEY || "";
export const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
