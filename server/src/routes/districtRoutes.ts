import { Router } from "express";
import {
  listDistricts,
  getDistrictSummary,
  getDistrictTimeseries,
} from "../controllers/districtController";
import { compareDistricts } from "../controllers/compareController";
import { getDistrictFromCoords } from "../services/geolocationService";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

// Specific routes must be defined before dynamic routes
router.get("/", listDistricts);
router.get("/by-location", asyncHandler(async (req, res) => {
    const { lat, lon } = req.query;
    const district = await getDistrictFromCoords(Number(lat), Number(lon));
    res.json({ district });
}));
router.get("/compare", compareDistricts);
router.get("/:id/summary", getDistrictSummary);
router.get("/:id/timeseries", getDistrictTimeseries);

export default router;
