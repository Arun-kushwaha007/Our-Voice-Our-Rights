import express from "express";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";
import districtRoutes from "./routes/districtRoutes";
import { errorHandler } from "./utils/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/compare", districtRoutes); // compare handled inside controller OR use separate route

// global error handler
app.use(errorHandler);

export default app;
