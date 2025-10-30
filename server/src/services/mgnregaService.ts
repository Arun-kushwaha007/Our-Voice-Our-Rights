import axios from "axios";
import { API_KEY } from "../config/env";
import { logger } from "../utils/logger";

const API_BASE_URL = "https://api.data.gov.in/resource";

export const fetchDataForState = async (state: string) => {
 
  const resourceId = "your_resource_id_here"; 
  const url = `${API_BASE_URL}/${resourceId}?api-key=${API_KEY}&format=json&filters[state_name]=${state}`;

  try {
    const response = await axios.get(url);
    logger.info(`Fetched data for state: ${state}`);
    return response.data.records;
  } catch (error) {
    logger.error(`Error fetching data for state ${state}:`, error);
    throw error;
  }
};
