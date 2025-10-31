import express from "express";
import cors from "cors";
import morgan from "morgan";
import rateLimit from 'express-rate-limit';
import { errorHandler } from "./utils/errorHandler";
import districtRoutes from "./routes/districtRoutes";
import compareRoutes from "./routes/compareRoutes";

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/districts", districtRoutes);
app.use("/api/compare", compareRoutes);

// Global error handler
app.use(errorHandler);

export default app;
