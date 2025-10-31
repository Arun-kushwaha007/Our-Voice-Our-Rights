import mongoose, { Schema, Document } from 'mongoose';

// Interface reflecting the detailed data from the MGNREGA API
export interface IDistrictSnapshot extends Document {
  fin_year: string;
  month: string;
  state_name: string;
  district_name: string;
  
  // Key Metrics from API
  approved_labour_budget: number;
  average_wage_rate_per_day_per_person: number;
  average_days_of_employment_provided_per_household: number;
  total_no_of_jobcards_issued: number;
  total_no_of_workers: number;
  sc_workers_against_active_workers: number;
  st_workers_against_active_workers: number;
  women_persondays_percent: number;
  percentage_payments_generated_within_15_days: number;
  total_expenditure: number;

  fetchedAt: Date;
  performanceIndex: number; // A calculated field
}

const DistrictSnapshotSchema: Schema = new Schema({
  fin_year: { type: String, required: true, index: true },
  month: { type: String, required: true, index: true },
  state_name: { type: String, required: true, index: true },
  district_name: { type: String, required: true, index: true },

  approved_labour_budget: { type: Number, required: true },
  average_wage_rate_per_day_per_person: { type: Number, required: true },
  average_days_of_employment_provided_per_household: { type: Number, required: true },
  total_no_of_jobcards_issued: { type: Number, required: true },
  total_no_of_workers: { type: Number, required: true },
  sc_workers_against_active_workers: { type: Number, required: true },
  st_workers_against_active_workers: { type: Number, required: true },
  women_persondays_percent: { type: Number, required: true },
  percentage_payments_generated_within_15_days: { type: Number, required: true },
  total_expenditure: { type: Number, required: true },

  fetchedAt: { type: Date, default: Date.now },
  performanceIndex: { type: Number, required: true },
});

// Unique index to prevent duplicate entries for the same district in the same month and year
DistrictSnapshotSchema.index({ fin_year: 1, month: 1, state_name: 1, district_name: 1 }, { unique: true });

export default mongoose.model<IDistrictSnapshot>('DistrictSnapshot', DistrictSnapshotSchema);
