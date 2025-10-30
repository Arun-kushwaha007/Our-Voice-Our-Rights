import { fetchDataForState } from "../services/mgnregaService";
import { upsertDistrictSnapshot } from "../services/districtService";
import { parseRawData } from "../utils/dataParser";
import { logger } from "../utils/logger";

export const runETLForState = async (state: string) => {
  logger.info(`Starting ETL for state: ${state}`);
  try {
    const rawData = await fetchDataForState(state);
    const snapshots = parseRawData(rawData);

    for (const snap of snapshots) {
      await upsertDistrictSnapshot(snap);
    }

    logger.info(`ETL completed for state: ${state}. ${snapshots.length} snapshots processed.`);
  } catch (error) {
    logger.error(`ETL failed for state ${state}:`, error);
  }
};
