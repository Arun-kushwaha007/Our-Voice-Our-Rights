import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./utils/errorHandler";
import healthRoutes from "./routes/healthRoutes";
import districtRoutes from "./routes/districtRoutes";
import compareRoutes from "./routes/compareRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", healthRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/compare", compareRoutes);

// Global error handler
app.use(errorHandler);

export default app;
