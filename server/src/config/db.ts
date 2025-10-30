import mongoose from "mongoose";
import { MONGO_URI } from "./env";
import { logger } from "../utils/logger";

export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not set in env");
    }
    await mongoose.connect(MONGO_URI, {
      // options are automatically set in modern drivers
    });
    logger.info("MongoDB connected");
  } catch (err) {
    logger.error("MongoDB connection error", err);
    process.exit(1);
  }
};
