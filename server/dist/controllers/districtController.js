"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistrictTimeseries = exports.getDistrictSummary = exports.listDistricts = void 0;
const asyncHandler_1 = require("../middleware/asyncHandler");
const districtService = __importStar(require("../services/districtService"));
/**
 * GET /api/districts
 */
exports.listDistricts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const list = await districtService.listDistricts();
    res.json({ data: list });
});
/**
 * GET /api/districts/:id/summary
 */
exports.getDistrictSummary = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const latest = await districtService.getLatestSummary(id);
    const trend = await districtService.getLastNMonths(id, 12);
    if (!latest)
        return res.status(404).json({ message: "No data for district" });
    res.json({ latest, trend });
});
/**
 * GET /api/districts/:id/timeseries
 */
exports.getDistrictTimeseries = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const id = req.params.id;
    const months = parseInt(req.query.months) || 12;
    const data = await districtService.getLastNMonths(id, months);
    res.json({ data });
});
