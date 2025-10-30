"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistrictFromCoords = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
const GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const getDistrictFromCoords = async (lat, lon) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        logger_1.logger.warn("Google Maps API key not found. Geolocation will not work.");
        return null;
    }
    const url = `${GEOCODING_API_URL}?latlng=${lat},${lon}&key=${apiKey}`;
    try {
        const response = await axios_1.default.get(url);
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
    }
    catch (error) {
        logger_1.logger.error("Error fetching geolocation data:", error);
        return null;
    }
};
exports.getDistrictFromCoords = getDistrictFromCoords;
