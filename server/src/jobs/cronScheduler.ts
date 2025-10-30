import cron from "node-cron";
import { runETLForState } from "./fetchMGNREGAData";
import { logger } from "../utils/logger";

export const scheduleJobs = () => {
  cron.schedule("0 0 * * *", () => {
    logger.info("Running scheduled ETL job");
   
    runETLForState("YourState"); 
  });
};
