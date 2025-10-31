// This interface must be kept in sync with the backend's `IDistrictSnapshot`
// located in `server/src/models/District.ts`.

export interface IDistrictSnapshot {
  _id: string; // MongoDB ObjectId
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

  fetchedAt: string; // Comes as an ISO string from the API
  performanceIndex: number;
}

// Interface for the API response when fetching a list of snapshots
export interface IApiResponse {
  data: IDistrictSnapshot[];
}
