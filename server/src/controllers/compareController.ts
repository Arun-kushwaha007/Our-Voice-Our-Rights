import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import * as districtService from "../services/districtService";
import * as cacheService from "../services/cacheService";

/**
 * GET /api/compare?d1=ID1&d2=ID2
 */
export const compareDistricts = asyncHandler(async (req: Request, res: Response) => {
  const { d1, d2 } = req.query as { d1: string; d2: string };
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
