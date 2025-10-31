import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { MGNREGA_BASE_URL, MGNREGA_API_KEY } from "../config/env";

export const fetchMGNREGAData = async (stateName: string) => {
    let allRecords = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
        try {
            const response = await axios.get(MGNREGA_BASE_URL!, {
                params: {
                    'api-key': MGNREGA_API_KEY,
                    'format': 'json',
                    'limit': limit,
                    'offset': offset,
                    'filters[state_name]': stateName
                }
            });

            const records = response.data.records;
            if (records.length > 0) {
                allRecords.push(...records);
                offset += limit;
            } else {
                hasMore = false;
            }
        } catch (error) {
            console.error("Error fetching MGNREGA data:", error);
            hasMore = false; // Stop fetching if an error occurs
            return []; // Return empty array on error
        }
    }
    return allRecords;
};
