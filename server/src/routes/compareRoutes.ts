import { Router } from "express";
import { compareDistricts } from "../controllers/compareController";

const router = Router();

router.route("/").post(compareDistricts);

export default router;
