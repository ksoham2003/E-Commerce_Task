// middlewares/rateLimiter.js
import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 10 requests
	message: {
		success: false,
		message: "Too many requests, please try again later.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});

export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5, // stricter for login/register
	message: {
		success: false,
		message: "Too many authentication attempts.",
	},
});
