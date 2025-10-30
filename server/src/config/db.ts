import mongoose from "mongoose";
import { MONGO_URI } from "./env";
import { logger } from "../utils/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info("MongoDB connected");
  } catch (err: any) {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};
