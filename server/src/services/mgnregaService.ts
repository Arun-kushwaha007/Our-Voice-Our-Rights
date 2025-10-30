import axios from "axios";
import { MGNREGA_BASE_URL, MGNREGA_API_KEY } from "../config/env";

export const fetchMGNREGAData = async () => {
    try {
        const response = await axios.get(`${MGNREGA_BASE_URL}?api-key=${MGNREGA_API_KEY}&format=json&offset=0&limit=100`);
        return response.data.records;
    } catch (error) {
        console.error("Error fetching MGNREGA data:", error);
        return [];
    }
};
