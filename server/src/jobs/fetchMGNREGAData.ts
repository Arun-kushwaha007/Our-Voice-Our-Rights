import { fetchMGNREGAData } from "../services/mgnregaService";
import DistrictSnapshot from "../models/District";
import { connectDB } from "../config/db";
import mongoose from "mongoose";

// Helper function to safely parse numbers, returning 0 for invalid or 'NA' values
const safeParseFloat = (value: any): number => {
    if (value === null || value === undefined || value === 'NA') {
        return 0;
    }
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};

// Function to calculate a performance index based on key metrics
const calculatePerformanceIndex = (record: any): number => {
    const avgDaysEmployment = safeParseFloat(record.average_days_of_employment_provided_per_household);
    const womenParticipation = safeParseFloat(record.women_persondays_percent);
    const timelyPayments = safeParseFloat(record.percentage_payments_generated_within_15_days);

    // Simple weighted average - weights can be adjusted based on priorities
    const index = (avgDaysEmployment * 0.4) + (womenParticipation * 0.3) + (timelyPayments * 0.3);
    return parseFloat(index.toFixed(2));
};

const updateDistrictData = async (stateName: string) => {
    try {
        await connectDB();
        console.log('Fetching MGNREGA data for state:', stateName);
        const records = await fetchMGNREGAData(stateName);

        if (records && records.length > 0) {
            console.log(`Found ${records.length} records for ${stateName}. Processing...`);
            for (const record of records) {
                try {
                    const filter = {
                        fin_year: record.fin_year,
                        month: record.month,
                        state_name: record.state_name,
                        district_name: record.district_name,
                    };

                   const update = {  
                       ...filter,  
                       Approved_Labour_Budget: safeParseFloat(record.approved_labour_budget),  
                       Average_Wage_rate_per_day_per_person: safeParseFloat(record.average_wage_rate_per_day_per_person),  
                       Average_days_of_employment_provided_per_Household: safeParseFloat(record.average_days_of_employment_provided_per_household),  
                       Total_No_of_JobCards_issued: safeParseFloat(record.total_no_of_jobcards_issued),  
                       Total_No_of_Workers: safeParseFloat(record.total_no_of_workers),  
                       SC_workers_against_active_workers: safeParseFloat(record.sc_workers_against_active_workers),  
                       ST_workers_against_active_workers: safeParseFloat(record.st_workers_against_active_workers),  
                       women_persondays_percent: safeParseFloat(record.women_persondays_percent),  
                       percentage_payments_gererated_within_15_days: safeParseFloat(record.percentage_payments_generated_within_15_days),  
                       total_expenditure: safeParseFloat(record.total_expenditure),  
                       Total_Exp: safeParseFloat(record.total_exp),  
                       Women_Persondays: safeParseFloat(record.women_persondays),  
                       performanceIndex: calculatePerformanceIndex(record),  
                       fetchedAt: new Date(),  
                   };
                    
                    await DistrictSnapshot.findOneAndUpdate(filter, update, { upsert: true, new: true });
                } catch (dbError) {
                    console.error(`Error processing record for ${record.district_name}:`, dbError);
                }
            }
            console.log(`District data for ${stateName} updated successfully.`);
        } else {
            console.log(`No records found for ${stateName}.`);
        }
    } catch (error) {
        console.error(`Error in ETL job for ${stateName}:`, error);
        process.exit(1); // Exit with error code if the job fails
    } finally {
        await mongoose.disconnect();
        console.log("Database connection closed.");
    }
};
// Support multiple states via comma-separated command line argument  
const states = process.argv[2]?.split(',') || ["UTTAR PRADESH", "MAHARASHTRA", "KARNATAKA", "TAMIL NADU"];  
  
(async () => {  
    for (const state of states) {  
        await updateDistrictData(state.trim());  
    }  
})();

// const states = process.argv[2]?.split(',') || [
//   "UTTAR PRADESH", "MAHARASHTRA", "KARNATAKA", "TAMIL NADU", "GUJARAT", "ANDHRA PRADESH", 
//   "RAJASTHAN", "WEST BENGAL", "MADHYA PRADESH", "TAMIL NADU", "KERALA", "BIHAR", "PUNJAB", 
//   "HARYANA", "DELHI", "JHARKHAND", "Uttar Pradesh", "Uttarakhand", "ASSAM", "HIMACHAL PRADESH", 
//   "ODISHA", "TELANGANA", "CHHATTISGARH", "TRIPURA", "MEGHALAYA", "MIZORAM", "NAGALAND", 
//   "ARUNACHAL PRADESH", "GOA", "SIKKIM", "MANIPUR", "KERALA", "HIMACHAL PRADESH"
// ];
