/**
 * Very simple scheduler to kick off ETL on startup and optionally at an interval.
 * For more robust scheduling use node-cron or a queue (BullMQ).
 */
import { runFetch } from "./fetchMGNREGAData";
import { logger } from "../utils/logger";

export const startScheduler = () => {
  // run immediately on startup
  runFetch().catch(err => logger.error("Initial ETL failed", err));

  // then run daily at 03:00 server time (basic setInterval example; adapt to node-cron)
  const oneDay = 24 * 60 * 60 * 1000;
  setInterval(() => {
    logger.info("Scheduled ETL starting");
    runFetch().catch(err => logger.error("Scheduled ETL failed", err));
  }, oneDay);
};
