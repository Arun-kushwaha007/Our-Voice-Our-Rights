import DistrictSnapshot from '../models/District';
import { fetchMGNREGAData } from '../services/mgnregaService';
import { logger } from './logger';

// A simple normalization function (scales a value to a 0-100 range)
const normalize = (value: number, min: number, max: number): number => {
  if (max === min) return 50; // Avoid division by zero, return a neutral score
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
};

// --- Performance Index Calculation ---
// This function calculates a weighted performance score based on key metrics.
const calculatePerformanceIndex = (record: any, allRecords: any[]): number => {
    const weights = {
        employmentProvided: 0.3,
        timelyPayments: 0.3,
        womenParticipation: 0.2,
        wageRate: 0.2,
    };

    // Calculate min/max for normalization across the entire dataset for the state
    const metrics = allRecords.map(r => ({
        employment: Number(r.Average_days_of_employment_provided_per_Household) || 0,
        payments: Number(r.percentage_payments_gererated_within_15_days) || 0,
        women: (Number(r.Women_Persondays) / (Number(r.Persondays_of_Central_Liability_so_far) || 1)) * 100,
        wage: Number(r.Average_Wage_rate_per_day_per_person) || 0,
    }));

    const minMax = {
        employment: { min: Math.min(...metrics.map(m => m.employment)), max: Math.max(...metrics.map(m => m.employment)) },
        payments: { min: Math.min(...metrics.map(m => m.payments)), max: Math.max(...metrics.map(m => m.payments)) },
        women: { min: Math.min(...metrics.map(m => m.women)), max: Math.max(...metrics.map(m => m.women)) },
        wage: { min: Math.min(...metrics.map(m => m.wage)), max: Math.max(...metrics.map(m => m.wage)) },
    };

    // --- Calculate scores for the current record ---
    const womenParticipationPercent = (Number(record.Women_Persondays) / (Number(record.Persondays_of_Central_Liability_so_far) || 1)) * 100;

    const scores = {
        employmentProvided: normalize(Number(record.Average_days_of_employment_provided_per_Household) || 0, minMax.employment.min, minMax.employment.max),
        timelyPayments: normalize(Number(record.percentage_payments_gererated_within_15_days) || 0, minMax.payments.min, minMax.payments.max),
        womenParticipation: normalize(womenParticipationPercent, minMax.women.min, minMax.women.max),
        wageRate: normalize(Number(record.Average_Wage_rate_per_day_per_person) || 0, minMax.wage.min, minMax.wage.max),
    };

    // --- Calculate weighted average ---
    const finalIndex = 
        scores.employmentProvided * weights.employmentProvided +
        scores.timelyPayments * weights.timelyPayments +
        scores.womenParticipation * weights.womenParticipation +
        scores.wageRate * weights.wageRate;

    return parseFloat(finalIndex.toFixed(2));
};


export const seedDatabaseForState = async (stateName: string): Promise<void> => {
  logger.info(`Starting database seed for state: ${stateName}...`);

  try {
    // 1. Fetch all records for the state from the external API
    const apiRecords = await fetchMGNREGAData(stateName);
    if (!apiRecords || apiRecords.length === 0) {
      logger.warn(`No records found for state: ${stateName}. Seeding cannot proceed.`);
      return;
    }

    // 2. Transform API data into the format of our database model
    const transformedRecords = apiRecords.map(record => {
      const totalPersonDays = Number(record.Persondays_of_Central_Liability_so_far) || 0;
      const womenPersonDays = Number(record.Women_Persondays) || 0;
      const womenParticipationPercent = totalPersonDays > 0 ? (womenPersonDays / totalPersonDays) * 100 : 0;
      
      return {
        ...record, // Spread all fields from the API record
        // Ensure numeric types are correctly parsed
        Approved_Labour_Budget: Number(record.Approved_Labour_Budget) || 0,
        Average_Wage_rate_per_day_per_person: Number(record.Average_Wage_rate_per_day_per_person) || 0,
        Average_days_of_employment_provided_per_Household: Number(record.Average_days_of_employment_provided_per_Household) || 0,
        Total_No_of_JobCards_issued: Number(record.Total_No_of_JobCards_issued) || 0,
        Total_No_of_Workers: Number(record.Total_No_of_Workers) || 0,
        SC_workers_against_active_workers: Number(record.SC_workers_against_active_workers) || 0,
        ST_workers_against_active_workers: Number(record.ST_workers_against_active_workers) || 0,
        Total_Exp: Number(record.Total_Exp) || 0,
        percentage_payments_gererated_within_15_days: Number(record.percentage_payments_gererated_within_15_days) || 0,
        Women_Persondays: womenPersonDays,

        // Add calculated/transformed fields required by the client
        women_persondays_percent: parseFloat(womenParticipationPercent.toFixed(2)),
        total_expenditure: Number(record.Total_Exp) || 0, // Align with client-side property
        performanceIndex: calculatePerformanceIndex(record, apiRecords), // Calculate the index
        
        // Metadata
        fetchedAt: new Date(),
      };
    });

    // 3. Use bulk operations to efficiently insert/update the database
    const bulkOps = transformedRecords.map(record => ({
      updateOne: {
        filter: { 
          fin_year: record.fin_year, 
          month: record.month, 
          state_name: record.state_name, 
          district_name: record.district_name 
        },
        update: { $set: record },
        upsert: true, // Insert the document if it does not exist
      },
    }));

    if (bulkOps.length > 0) {
      logger.info(`Performing bulk upsert of ${bulkOps.length} records for ${stateName}...`);
      await DistrictSnapshot.bulkWrite(bulkOps);
      logger.info(`Successfully seeded database for state: ${stateName}.`);
    } else {
      logger.info(`No new records to seed for state: ${stateName}.`);
    }

  } catch (error) {
    logger.error(`Error seeding database for state ${stateName}:`, error);
    throw new Error(`Failed to seed database for ${stateName}.`);
  }
};
