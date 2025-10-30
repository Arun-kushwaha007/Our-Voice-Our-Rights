import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const MGNREGA_BASE_URL = process.env.MGNREGA_BASE_URL || "";
export const MGNREGA_API_KEY = process.env.MGNREGA_API_KEY || "";
