export interface IMetrics {
  beneficiaries: number;
  fundsReleased: number;
  daysWorked: number;
  paymentsOnTimePct: number;
}

export interface IDistrictSnapshot {
  districtId: string;
  districtName: string;
  state: string;
  year: number;
  month: number;
  fetchedAt: Date;
  metrics: IMetrics;
}
