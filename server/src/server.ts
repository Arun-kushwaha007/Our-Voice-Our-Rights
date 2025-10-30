import app from "./app";
import { PORT } from "./config/env";
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redis";
import { logger } from "./utils/logger";
import { scheduleJobs } from "./jobs/cronScheduler";

const startServer = async () => {
  await connectDB();
  await connectRedis();
  
  app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
    scheduleJobs();
  });
};

startServer();
