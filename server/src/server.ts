import express from "express";
import cors from "cors";
import { PORT } from "./config/env";
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";
import { logger } from "./utils/logger";
import { errorHandler } from "./utils/errorHandler";
import { scheduleJobs } from "./jobs/cronScheduler";
import healthRoutes from "./routes/healthRoutes";
import districtRoutes from "./routes/districtRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/districts", districtRoutes);

// Global error handler
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  await connectRedis();
  
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
    scheduleJobs();
  });
};

startServer();
