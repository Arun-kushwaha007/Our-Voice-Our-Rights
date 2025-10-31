import DistrictSnapshot, { IDistrictSnapshot } from '../models/District';

/**
 * Get all available snapshots for a specific district, sorted by date.
 * @param stateName - The name of the state.
 * @param districtName - The name of the district.
 * @returns A promise that resolves to an array of district snapshots.
 */
export const getDistrictTimeSeries = async (stateName: string, districtName: string): Promise<IDistrictSnapshot[]> => {
  return DistrictSnapshot.find({ state_name: stateName, district_name: districtName })
    .sort({ fin_year: -1, month: -1 }) // Sort by most recent first
    .lean();
};

/**
 * Get the latest available snapshot for every district in a given state.
 * @param stateName - The name of the state.
 * @returns A promise that resolves to an array of the latest snapshots for each district.
 */
export const getLatestStateData = async (stateName: string): Promise<IDistrictSnapshot[]> => {
  // Use aggregation to find the latest document for each district
  const latestData = await DistrictSnapshot.aggregate([
    { $match: { state_name: stateName } },
    { $sort: { fin_year: -1, month: -1 } },
    {
      $group: {
        _id: '$district_name', // Group by district
        latestSnapshot: { $first: '$$ROOT' } // Get the first document (which is the latest)
      }
    },
    { $replaceRoot: { newRoot: '$latestSnapshot' } }, // Promote the snapshot to the root level
    { $sort: { district_name: 1 } } // Sort alphabetically by district name
  ]);

  return latestData;
};

/**
 * Get a list of all unique states available in the database.
 * @returns A promise that resolves to an array of state names.
 */
export const listStates = async (): Promise<string[]> => {
  return DistrictSnapshot.distinct('state_name');
};

/**
 * Get a list of all unique districts for a given state.
 * @param stateName - The name of the state.
 * @returns A promise that resolves to an array of district names.
 */
export const listDistrictsByState = async (stateName: string): Promise<string[]> => {
  return DistrictSnapshot.distinct('district_name', { state_name: stateName });
};
