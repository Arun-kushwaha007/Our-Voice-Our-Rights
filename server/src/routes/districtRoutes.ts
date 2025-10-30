import { Router } from "express";
import { listDistricts, getDistrictSummary } from "../controllers/districtController";
import { compareDistricts } from "../controllers/compareController";

const router = Router();

router.get("/", listDistricts);
router.get("/:id/summary", getDistrictSummary);
router.get("/compare", compareDistricts); // optional path if you want

export default router;
