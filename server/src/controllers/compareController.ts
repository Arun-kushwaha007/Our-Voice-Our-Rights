import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import * as districtService from "../services/districtService";

/**
 * GET /api/compare?d1=ID1&d2=ID2
 */
export const compareDistricts = asyncHandler(async (req: Request, res: Response) => {
  const { d1, d2 } = req.query as any;
  if (!d1 || !d2) return res.status(400).json({ message: "Provide both d1 and d2 query params" });
  const a = await districtService.getLatestSummary(d1);
  const b = await districtService.getLatestSummary(d2);
  res.json({ a, b });
});
