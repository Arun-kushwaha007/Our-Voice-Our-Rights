import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import redisClient from "../config/redis";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: new Date().toISOString(),
    database: {
      status: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    },
    redis: {
      status: redisClient.isOpen ? "connected" : "disconnected",
    },
  };
  try {
    res.send(healthcheck);
  } catch (e: any) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

export default router;
