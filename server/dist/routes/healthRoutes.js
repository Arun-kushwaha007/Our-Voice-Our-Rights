"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const redis_1 = __importDefault(require("../config/redis"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: "OK",
        timestamp: new Date().toISOString(),
        database: {
            status: mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected",
        },
        redis: {
            status: redis_1.default.isOpen ? "connected" : "disconnected",
        },
    };
    try {
        res.send(healthcheck);
    }
    catch (e) {
        healthcheck.message = e;
        res.status(503).send();
    }
});
exports.default = router;
