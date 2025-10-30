"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastNMonths = exports.listDistricts = exports.getLatestSummary = exports.upsertDistrictSnapshot = void 0;
const District_1 = __importDefault(require("../models/District"));
/**
 * Save a normalized snapshot for a district-month.
 */
const upsertDistrictSnapshot = async (snap) => {
    if (!snap.districtId || !snap.year || !snap.month) {
        throw new Error("Invalid snapshot payload");
    }
    const filter = { districtId: snap.districtId, year: snap.year, month: snap.month };
    const doc = await District_1.default.findOneAndUpdate(filter, { $set: snap }, { upsert: true, new: true });
    return doc;
};
exports.upsertDistrictSnapshot = upsertDistrictSnapshot;
const getLatestSummary = async (districtId) => {
    // latest snapshot sorted by year/month
    return District_1.default.findOne({ districtId }).sort({ year: -1, month: -1 }).lean();
};
exports.getLatestSummary = getLatestSummary;
const listDistricts = async () => {
    // list distinct districts with latest snapshot metadata
    return District_1.default.aggregate([
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
exports.listDistricts = listDistricts;
const getLastNMonths = async (districtId, months = 12) => {
    // get last N monthly snapshots
    return District_1.default.find({ districtId })
        .sort({ year: -1, month: -1 })
        .limit(months)
        .lean();
};
exports.getLastNMonths = getLastNMonths;
