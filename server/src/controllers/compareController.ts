import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import District from "../models/District";

// @desc    Compare two districts
// @route   POST /api/compare
// @access  Public
export const compareDistricts = asyncHandler(async (req: Request, res: Response) => {
    const { district1, district2 } = req.body;

    const d1 = await District.findById(district1);
    const d2 = await District.findById(district2);

    if (d1 && d2) {
        res.json({
            [d1.get('name')]: d1.performanceIndex,
            [d2.get('name')]: d2.performanceIndex,
        });
    } else {
        res.status(404);
        throw new Error("One or both districts not found");
    }
});
