"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const districtController_1 = require("../controllers/districtController");
const compareController_1 = require("../controllers/compareController");
const geolocationService_1 = require("../services/geolocationService");
const asyncHandler_1 = require("../middleware/asyncHandler");
const router = (0, express_1.Router)();
router.get("/", districtController_1.listDistricts);
router.get("/by-location", (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { lat, lon } = req.query;
    const district = await (0, geolocationService_1.getDistrictFromCoords)(Number(lat), Number(lon));
    res.json({ district });
}));
router.get("/compare", compareController_1.compareDistricts);
router.get("/:id/summary", districtController_1.getDistrictSummary);
router.get("/:id/timeseries", districtController_1.getDistrictTimeseries);
exports.default = router;
