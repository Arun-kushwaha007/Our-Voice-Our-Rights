import express from "express";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler";
import healthRoutes from "./routes/healthRoutes";
import districtRoutes from "./routes/districtRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/districts", districtRoutes);

// Global error handler
app.use(errorHandler);

export default app;
