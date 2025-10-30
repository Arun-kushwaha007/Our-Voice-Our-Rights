import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MGNREGA_API_KEY = process.env.MGNREGA_API_KEY;
export const MGNREGA_BASE_URL = process.env.MGNREGA_BASE_URL;

if (!MONGO_URI || !MGNREGA_API_KEY || !MGNREGA_BASE_URL) {
    console.error("FATAL ERROR: Missing required environment variables.");
    process.exit(1);
}
