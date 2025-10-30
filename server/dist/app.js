"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./utils/errorHandler");
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const districtRoutes_1 = __importDefault(require("./routes/districtRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/health", healthRoutes_1.default);
app.use("/api/districts", districtRoutes_1.default);
// Global error handler
app.use(errorHandler_1.errorHandler);
exports.default = app;
