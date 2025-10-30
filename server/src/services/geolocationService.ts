import axios from "axios";
import { logger } from "../utils/logger";

const GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

export const getDistrictFromCoords = async (lat: number, lon: number) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    logger.warn("Google Maps API key not found. Geolocation will not work.");
    return null;
  }

  const url = `${GEOCODING_API_URL}?latlng=${lat},${lon}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { results } = response.data;

    if (results && results.length > 0) {
      for (const result of results) {
        for (const component of result.address_components) {
          if (component.types.includes("administrative_area_level_2")) {
            return component.long_name;
          }
        }
      }
    }
    return null;
  } catch (error) {
    logger.error("Error fetching geolocation data:", error);
    return null;
  }
};
