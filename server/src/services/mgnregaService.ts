import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { MGNREGA_BASE_URL, MGNREGA_API_KEY } from "../config/env";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const fetchMGNREGAData = async (stateName: string) => {
    let allRecords = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
        let retries = 0;
        let success = false;
        while (retries < MAX_RETRIES && !success) {
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
                success = true;
            } catch (error) {
                console.error(`Error fetching MGNREGA data for ${stateName} (attempt ${retries + 1}/${MAX_RETRIES})`);
                retries++;
                if (retries < MAX_RETRIES) {
                    await new Promise(res => setTimeout(res, RETRY_DELAY));
                } else {
                    console.error(`All retries failed for ${stateName}. Giving up.`);
                    hasMore = false; // Stop fetching if an error occurs
                    return []; // Return empty array on error
                }
            }
        }
    }
    return allRecords;
};
