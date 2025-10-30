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
exports.compareDistricts = void 0;
const asyncHandler_1 = require("../middleware/asyncHandler");
const districtService = __importStar(require("../services/districtService"));
const cacheService = __importStar(require("../services/cacheService"));
/**
 * GET /api/compare?d1=ID1&d2=ID2
 */
exports.compareDistricts = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { d1, d2 } = req.query;
    if (!d1 || !d2) {
        return res.status(400).json({ message: "Provide both d1 and d2 query params" });
    }
    const cacheKey = `compare:${d1}:${d2}`;
    let comparison = await cacheService.getCache(cacheKey);
    if (!comparison) {
        const a = await districtService.getLatestSummary(d1);
        const b = await districtService.getLatestSummary(d2);
        if (!a || !b) {
            return res.status(404).json({ message: "Data not found for one or both districts" });
        }
        comparison = { a, b };
        await cacheService.setCache(cacheKey, comparison, 3600); // Cache for 1 hour
    }
    res.json(comparison);
});
