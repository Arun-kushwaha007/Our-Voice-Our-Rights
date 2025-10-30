"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const fetchMGNREGAData_1 = require("./fetchMGNREGAData");
const logger_1 = require("../utils/logger");
const scheduleJobs = () => {
    node_cron_1.default.schedule("0 0 * * *", () => {
        logger_1.logger.info("Running scheduled ETL job");
        (0, fetchMGNREGAData_1.runETLForState)("YourState");
    });
};
exports.scheduleJobs = scheduleJobs;
