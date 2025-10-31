import cron from "node-cron";
import { exec } from "child_process";
import path from "path";

export const scheduleJobs = () => {
    // Schedule to run every day at midnight
    cron.schedule("0 0 * * *", () => {
        console.log("Running scheduled job: Fetch MGNREGA Data");
        
        // Path to the built JavaScript file for the job
        const jobScriptPath = path.join(__dirname, 'fetchMGNREGAData.js');

        // Execute the job using Node.js
        exec(`node ${jobScriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing job: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Job stderr: ${stderr}`);
                return;
            }
            console.log(`Job stdout: ${stdout}`);
        });
    });
};
