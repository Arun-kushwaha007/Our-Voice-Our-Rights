"use strict";
/**
 * Lightweight ETL runner:
 * - fetches data (raw) from MGNREGA API using mgnregaService
 * - normalizes into DistrictSnapshot documents via districtService.upsertDistrictSnapshot
 *
 * This is intentionally simple: you will adapt parsing depending on the exact API schema.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runFetch = exports.runETLForState = void 0;
const mgnregaService_1 = require("../services/mgnregaService");
const districtService_1 = require("../services/districtService");
const logger_1 = require("../utils/logger");
/* Example normalization function (adapt to real data structure) */
const normalizeRecord = ();
const mgnregaService_2 = require("../services/mgnregaService");
const dataParser_1 = require("../utils/dataParser");
const runETLForState = async (state) => {
    logger_1.logger.info(`Starting ETL for state: ${state}`);
    try {
        const rawData = await (0, mgnregaService_2.fetchDataForState)(state);
        const snapshots = (0, dataParser_1.parseRawData)(rawData);
        for (const snap of snapshots) {
            await (0, districtService_1.upsertDistrictSnapshot)(snap);
        }
        logger_1.logger.info(`ETL completed for state: ${state}. ${snapshots.length} snapshots processed.`);
    }
    catch (error) {
        logger_1.logger.error(`ETL failed for state ${state}:`, error);
    }
};
exports.runETLForState = runETLForState;
rec: any;
{
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
}
;
const runFetch = async () => {
    try {
        const payload = await (0, mgnregaService_1.fetchMGNREGARecords)({ limit: 5000 });
        const records = payload?.records || payload?.data || [];
        logger_1.logger.info(`Fetched ${records.length} records from MGNREGA source`);
        for (const rec of records) {
            const snap = normalizeRecord(rec);
            await (0, districtService_1.upsertDistrictSnapshot)(snap);
        }
        logger_1.logger.info("ETL complete");
    }
    catch (err) {
        logger_1.logger.error("ETL job failed", err);
    }
};
exports.runFetch = runFetch;
/* If run directly (ts-node src/jobs/fetchMGNREGAData.ts) */
if (require.main === module) {
    (0, exports.runFetch)().then(() => process.exit(0)).catch(() => process.exit(1));
}
