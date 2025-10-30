"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_URL = exports.API_KEY = exports.NODE_ENV = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 5000;
exports.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mgnrega";
exports.NODE_ENV = process.env.NODE_ENV || "development";
exports.API_KEY = process.env.API_KEY || "";
exports.REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
