import { IDistrictSnapshot } from "../models/District";

export const parseRawData = (rawData: any[]): Partial<IDistrictSnapshot>[] => {
  return rawData.map((item) => ({
    state: item.state_name,
    districtId: item.district_code,
    districtName: item.district_name,
    year: parseInt(item.year, 10),
    month: parseInt(item.month, 10),
    metrics: {
      beneficiaries: parseInt(item.total_beneficiaries, 10),
      fundsReleased: parseFloat(item.total_funds_released_rs_cr),
      daysWorked: parseInt(item.total_persondays_worked, 10),
    },
    raw: item,
  }));
};
