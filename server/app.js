import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

// Import routes
import indexRouter from "./routes/index.js";

// Create and configure the express server
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add routes to the express server
app.use("/", indexRouter);

export default app;