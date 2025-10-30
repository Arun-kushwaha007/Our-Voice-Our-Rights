import { Router } from "express";
import { getDistricts, getDistrictById } from "../controllers/districtController";

const router = Router();

router.route("/").get(getDistricts);
router.route("/:id").get(getDistrictById);

export default router;
