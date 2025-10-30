import DistrictSnapshot, { IDistrictSnapshot } from "../models/DistrictSnapshot";
import { logger } from "../utils/logger";

/**
 * Save a normalized snapshot for a district-month.
 */
export const upsertDistrictSnapshot = async (snap: Partial<IDistrictSnapshot>) => {
  if (!snap.districtId || !snap.year || !snap.month) {
    throw new Error("Invalid snapshot payload");
  }
  const filter = { districtId: snap.districtId, year: snap.year, month: snap.month };
  const doc = await DistrictSnapshot.findOneAndUpdate(filter, { $set: snap }, { upsert: true, new: true });
  return doc;
};

export const getLatestSummary = async (districtId: string) => {
  // latest snapshot sorted by year/month
  return DistrictSnapshot.findOne({ districtId }).sort({ year: -1, month: -1 }).lean();
};

export const listDistricts = async () => {
  // list distinct districts with latest snapshot metadata
  return DistrictSnapshot.aggregate([
    { $sort: { year: -1, month: -1 } },
    {
      $group: {
        _id: "$districtId",
        districtName: { $first: "$districtName" },
        state: { $first: "$state" },
        lastFetched: { $first: "$fetchedAt" }
      }
    },
    { $project: { _id: 0, districtId: "$_id", districtName: 1, state: 1, lastFetched: 1 } },
    { $sort: { districtName: 1 } }
  ]);
};

export const getLastNMonths = async (districtId: string, months = 12) => {
  // get last N monthly snapshots
  return DistrictSnapshot.find({ districtId })
    .sort({ year: -1, month: -1 })
    .limit(months)
    .lean();
};
