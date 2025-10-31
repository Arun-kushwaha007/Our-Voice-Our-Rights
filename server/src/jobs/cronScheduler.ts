import cron from 'node-cron';
import { exec } from 'child_process';

// Schedule the ETL job to run daily at midnight IST
export const scheduleJobs = () => {
    cron.schedule('0 0 * * *', () => {
        console.log('Running the daily ETL job...');
        const etlProcess = exec('ts-node src/jobs/fetchMGNREGAData.ts', (error, stdout, stderr) => {
            if (error) {
                console.error(`ETL job failed: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`ETL job stderr: ${stderr}`);
                return;
            }
            console.log(`ETL job output: ${stdout}`);
        });

        etlProcess.on('exit', (code) => {
            console.log(`ETL job exited with code ${code}`);
        });
    }, {
        timezone: 'Asia/Kolkata'
    });
};
