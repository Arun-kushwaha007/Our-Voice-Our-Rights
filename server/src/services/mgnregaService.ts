/**
 * Contains lightweight ETL logic for fetching from data.gov.in resource.
 * Note: Replace the RESOURCE_ID or use query params as required by API.
 */

import axios from "axios";
import { MGNREGA_BASE_URL, MGNREGA_API_KEY } from "../config/env";
import { logger } from "../utils/logger";

export const fetchMGNREGARecords = async (params?: Record<string, any>) => {
  try {
    const url = MGNREGA_BASE_URL; // e.g. https://api.data.gov.in/resource/<id>
    const query: Record<string, any> = {
      format: "json",
      // limit: 5000 // you may page if needed
      ...params
    };
    if (MGNREGA_API_KEY) query["api-key"] = MGNREGA_API_KEY;

    const resp = await axios.get(url, { params: query, timeout: 20000 });
    return resp.data;
  } catch (err: any) {
    logger.error("fetchMGNREGARecords failed", err?.message || err);
    throw err;
  }
};
