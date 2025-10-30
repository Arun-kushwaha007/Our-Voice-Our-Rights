"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDataForState = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
const API_BASE_URL = "https://api.data.gov.in/resource";
const fetchDataForState = async (state) => {
    const resourceId = "your_resource_id_here";
    const url = `${API_BASE_URL}/${resourceId}?api-key=${env_1.API_KEY}&format=json&filters[state_name]=${state}`;
    try {
        const response = await axios_1.default.get(url);
        logger_1.logger.info(`Fetched data for state: ${state}`);
        return response.data.records;
    }
    catch (error) {
        logger_1.logger.error(`Error fetching data for state ${state}:`, error);
        throw error;
    }
};
exports.fetchDataForState = fetchDataForState;
