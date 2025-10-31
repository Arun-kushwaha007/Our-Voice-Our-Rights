// This interface must be kept in sync with the backend's `IDistrictSnapshot`
// located in `server/src/models/District.ts`.

export interface IDistrictSnapshot {
  _id: string; // MongoDB ObjectId
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
  fetchedAt: string; // Comes as an ISO string from the API
  performanceIndex: number;
}

// Interface for the API response when fetching a list of snapshots
export interface IApiResponse {
  data: IDistrictSnapshot[];
}
