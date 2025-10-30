import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import * as districtService from "../services/districtService";

/**
 * GET /api/districts
 */
export const listDistricts = asyncHandler(async (req: Request, res: Response) => {
  const list = await districtService.listDistricts();
  res.json({ data: list });
});

/**
 * GET /api/districts/:id/summary
 */
export const getDistrictSummary = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const latest = await districtService.getLatestSummary(id);
  const trend = await districtService.getLastNMonths(id, 12);
  if (!latest) return res.status(404).json({ message: "No data for district" });
  res.json({ latest, trend });
});

/**
 * GET /api/districts/:id/timeseries
 */
export const getDistrictTimeseries = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const months = parseInt(req.query.months as string) || 12;
  const data = await districtService.getLastNMonths(id, months);
  res.json({ data });
});
