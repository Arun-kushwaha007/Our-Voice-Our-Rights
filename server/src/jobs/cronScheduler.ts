import cron from "node-cron";
import { exec } from "child_process";

export const scheduleJobs = () => {
    cron.schedule("0 0 * * *", () => {
        console.log("Running daily data fetch job...");
        exec("ts-node src/jobs/fetchMGNREGAData.ts", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing job: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    });
};
