import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from "./config/config.js";
import errorHandler from "./middlewares/error.handler.js";
import { authLimiter, globalLimiter } from "./middlewares/rateLimiter.js";
import userRoute from "./routes/user.route.js";

// express instance
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(globalLimiter);
app.use(
	cors({
		origin: config.CLIENT_URL,
		credentials: true,
	}),
);

// health check
app.get("/check", (_, res) => {
	res.send("API running");
});

// route branching
app.use("/api/user", userRoute);

// global error handler
app.use(errorHandler);

export default app;
