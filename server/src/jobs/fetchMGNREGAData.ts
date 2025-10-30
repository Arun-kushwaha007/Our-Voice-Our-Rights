/**
 * Lightweight ETL runner:
 * - fetches data (raw) from MGNREGA API using mgnregaService
 * - normalizes into DistrictSnapshot documents via districtService.upsertDistrictSnapshot
 *
 * This is intentionally simple: you will adapt parsing depending on the exact API schema.
 */

import { fetchMGNREGARecords } from "../services/mgnregaService";
import { upsertDistrictSnapshot } from "../services/districtService";
import { logger } from "../utils/logger";

/* Example normalization function (adapt to real data structure) */
const normalizeRecord = (rec: any) => {
  // Example assumes rec has district_code, district_name, year, month, beneficiaries, funds_released, days_worked
  return {
    state: rec.state_name || rec.state || "Unknown",
    districtId: String(rec.district_code || rec.district_id || rec.district),
    districtName: rec.district_name || rec.district || "Unknown",
    year: Number(rec.year || new Date().getFullYear()),
    month: Number(rec.month || 1),
    metrics: {
      beneficiaries: Number(rec.beneficiaries || rec.total_beneficiaries || 0),
      fundsReleased: Number(rec.funds_released || rec.amount_released || 0),
      daysWorked: Number(rec.days_worked || rec.person_days || 0),
      paymentsOnTimePct: Number(rec.payments_on_time_pct || rec.payments_on_time || 0)
    },
    sourceUrl: rec.source || null,
    fetchedAt: new Date(),
    raw: rec
  };
};

export const runFetch = async () => {
  try {
    const payload = await fetchMGNREGARecords({ limit: 5000 });
    const records = payload?.records || payload?.data || [];
    logger.info(`Fetched ${records.length} records from MGNREGA source`);
    for (const rec of records) {
      const snap = normalizeRecord(rec);
      await upsertDistrictSnapshot(snap);
    }
    logger.info("ETL complete");
  } catch (err) {
    logger.error("ETL job failed", err);
  }
};

/* If run directly (ts-node src/jobs/fetchMGNREGAData.ts) */
if (require.main === module) {
  runFetch().then(() => process.exit(0)).catch(() => process.exit(1));
}
