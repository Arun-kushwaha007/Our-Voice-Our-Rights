import mongoose, { Schema, Document } from 'mongoose';

// Interface reflecting the detailed data from the MGNREGA API
export interface IDistrictSnapshot extends Document {
  fin_year: string;
  month: string;
  state_code: string;
  state_name: string;
  district_code: string;
  district_name: string;
  
  // Key Metrics from API, names adjusted to match API response
  Approved_Labour_Budget: number;
  Average_Wage_rate_per_day_per_person: number;
  Average_days_of_employment_provided_per_Household: number;
  Total_No_of_JobCards_issued: number;
  Total_No_of_Workers: number;
  SC_workers_against_active_workers: number;
  ST_workers_against_active_workers: number;
  Total_Exp: number;
  percentage_payments_gererated_within_15_days: number;
  Women_Persondays: number;

  // Additional fields from the API
  Differently_abled_persons_worked: number;
  Material_and_skilled_Wages: number;
  Number_of_Completed_Works: number;
  Number_of_GPs_with_NIL_exp: number;
  Number_of_Ongoing_Works: number;
  Persondays_of_Central_Liability_so_far: number;
  SC_persondays: number;
  ST_persondays: number;
  Total_Adm_Expenditure: number;
  Total_Households_Worked: number;
  Total_Individuals_Worked: number;
  Total_No_of_Active_Job_Cards: number;
  Total_No_of_Active_Workers: number;
  Total_No_of_HHs_completed_100_Days_of_Wage_Employment: number;
  Total_No_of_Works_Takenup: number;
  Wages: number;
  percent_of_Category_B_Works: number;
  percent_of_Expenditure_on_Agriculture_Allied_Works: number;
  percent_of_NRM_Expenditure: number;
  Remarks: string;

  // Fields for client-side use (may be calculated or transformed)
  women_persondays_percent: number;
  total_expenditure: number; // To match client-side property

  // Metadata
  fetchedAt: Date;
  performanceIndex: number; // A calculated field
}

const DistrictSnapshotSchema: Schema = new Schema({
  fin_year: { type: String, required: true, index: true },
  month: { type: String, required: true, index: true },
  state_code: { type: String, required: true },
  state_name: { type: String, required: true, index: true },
  district_code: { type: String, required: true },
  district_name: { type: String, required: true, index: true },

  Approved_Labour_Budget: { type: Number, required: true },
  Average_Wage_rate_per_day_per_person: { type: Number, required: true },
  Average_days_of_employment_provided_per_Household: { type: Number, required: true },
  Total_No_of_JobCards_issued: { type: Number, required: true },
  Total_No_of_Workers: { type: Number, required: true },
  SC_workers_against_active_workers: { type: Number, required: true },
  ST_workers_against_active_workers: { type: Number, required: true },
  Total_Exp: { type: Number, required: true },
  percentage_payments_gererated_within_15_days: { type: Number, required: true },
  Women_Persondays: { type: Number, required: true },
  
  Differently_abled_persons_worked: { type: Number },
  Material_and_skilled_Wages: { type: Number },
  Number_of_Completed_Works: { type: Number },
  Number_of_GPs_with_NIL_exp: { type: Number },
  Number_of_Ongoing_Works: { type: Number },
  Persondays_of_Central_Liability_so_far: { type: Number },
  SC_persondays: { type: Number },
  ST_persondays: { type: Number },
  Total_Adm_Expenditure: { type: Number },
  Total_Households_Worked: { type: Number },
  Total_Individuals_Worked: { type: Number },
  Total_No_of_Active_Job_Cards: { type: Number },
  Total_No_of_Active_Workers: { type: Number },
  Total_No_of_HHs_completed_100_Days_of_Wage_Employment: { type: Number },
  Total_No_of_Works_Takenup: { type: Number },
  Wages: { type: Number },
  percent_of_Category_B_Works: { type: Number },
  percent_of_Expenditure_on_Agriculture_Allied_Works: { type: Number },
  percent_of_NRM_Expenditure: { type: Number },
  Remarks: { type: String },

  women_persondays_percent: { type: Number, required: true },
  total_expenditure: { type: Number, required: true },

  fetchedAt: { type: Date, default: Date.now },
  performanceIndex: { type: Number, required: true },
});

// Unique index to prevent duplicate entries for the same district in the same month and year
DistrictSnapshotSchema.index({ fin_year: 1, month: 1, state_name: 1, district_name: 1 }, { unique: true });

export default mongoose.model<IDistrictSnapshot>('DistrictSnapshot', DistrictSnapshotSchema);
