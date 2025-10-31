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
    const avgDaysEmployment = safeParseFloat(record.Average_days_of_employment_provided_per_Household);  
    const totalPersonDays = safeParseFloat(record.Persondays_of_Central_Liability_so_far);  
    const womenPersonDays = safeParseFloat(record.Women_Persondays);  
    const womenParticipation = totalPersonDays > 0 ? (womenPersonDays / totalPersonDays) * 100 : 0;  
    const timelyPayments = safeParseFloat(record.percentage_payments_gererated_within_15_days);  
  
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
                       // Use exact field names from API (PascalCase with underscores)  
                       Approved_Labour_Budget: safeParseFloat(record.Approved_Labour_Budget),  
                       Average_Wage_rate_per_day_per_person: safeParseFloat(record.Average_Wage_rate_per_day_per_person),  
                       Average_days_of_employment_provided_per_Household: safeParseFloat(record.Average_days_of_employment_provided_per_Household),  
                       Total_No_of_JobCards_issued: safeParseFloat(record.Total_No_of_JobCards_issued),  
                       Total_No_of_Workers: safeParseFloat(record.Total_No_of_Workers),  
                       SC_workers_against_active_workers: safeParseFloat(record.SC_workers_against_active_workers),  
                       ST_workers_against_active_workers: safeParseFloat(record.ST_workers_against_active_workers),  
                       Total_Exp: safeParseFloat(record.Total_Exp),  
                       percentage_payments_gererated_within_15_days: safeParseFloat(record.percentage_payments_gererated_within_15_days),  
                       Women_Persondays: safeParseFloat(record.Women_Persondays),  
                         
                       // Additional fields from API  
                       Differently_abled_persons_worked: safeParseFloat(record.Differently_abled_persons_worked),  
                       Material_and_skilled_Wages: safeParseFloat(record.Material_and_skilled_Wages),  
                       Number_of_Completed_Works: safeParseFloat(record.Number_of_Completed_Works),  
                       Number_of_GPs_with_NIL_exp: safeParseFloat(record.Number_of_GPs_with_NIL_exp),  
                       Number_of_Ongoing_Works: safeParseFloat(record.Number_of_Ongoing_Works),  
                       Persondays_of_Central_Liability_so_far: safeParseFloat(record.Persondays_of_Central_Liability_so_far),  
                       SC_persondays: safeParseFloat(record.SC_persondays),  
                       ST_persondays: safeParseFloat(record.ST_persondays),  
                       Total_Adm_Expenditure: safeParseFloat(record.Total_Adm_Expenditure),  
                       Total_Households_Worked: safeParseFloat(record.Total_Households_Worked),  
                       Total_Individuals_Worked: safeParseFloat(record.Total_Individuals_Worked),  
                       Total_No_of_Active_Job_Cards: safeParseFloat(record.Total_No_of_Active_Job_Cards),  
                       Total_No_of_Active_Workers: safeParseFloat(record.Total_No_of_Active_Workers),  
                       Total_No_of_HHs_completed_100_Days_of_Wage_Employment: safeParseFloat(record.Total_No_of_HHs_completed_100_Days_of_Wage_Employment),  
                       Total_No_of_Works_Takenup: safeParseFloat(record.Total_No_of_Works_Takenup),  
                       Wages: safeParseFloat(record.Wages),  
                       percent_of_Category_B_Works: safeParseFloat(record.percent_of_Category_B_Works),  
                       percent_of_Expenditure_on_Agriculture_Allied_Works: safeParseFloat(record.percent_of_Expenditure_on_Agriculture_Allied_Works),  
                       percent_of_NRM_Expenditure: safeParseFloat(record.percent_of_NRM_Expenditure),  
                       Remarks: record.Remarks || 'NA',  
                         
                       // Calculated fields  
                       women_persondays_percent: safeParseFloat(record.Persondays_of_Central_Liability_so_far) > 0   
                           ? (safeParseFloat(record.Women_Persondays) / safeParseFloat(record.Persondays_of_Central_Liability_so_far)) * 100   
                           : 0,  
                       total_expenditure: safeParseFloat(record.Total_Exp),  
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
