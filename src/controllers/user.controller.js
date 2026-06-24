import config from "../config/config.js";
import asyncHandler from "../middlewares/async.handler.js";
import { loginService, registerService } from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

const COOKIE_OPTIONS = {
	httpOnly: true,
	sameSite: "lax",
	maxAge: 60 * 60 * 1000,
	secure: config.NODE_ENV === "production",
};

/**
 * @desc    Register a new user
 * @route   POST /api/user/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
	const { token, safeUser } = await registerService(req.body);

	res.cookie("token", token, COOKIE_OPTIONS);

	return res
		.status(201)
		.json(
			new ApiResponse(
				201,
				"User created successfully",
				safeUser,
			),
		);
});

/**
 * @desc    Login user and set token cookie
 * @route   POST /api/user/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
	const { token, safeUser } = await loginService(req.body);

	res.cookie("token", token, COOKIE_OPTIONS);

	return res
		.status(200)
		.json(new ApiResponse(200, "User logged in successfully", safeUser));
});

/**
 * @desc    Logout user and clear token cookie
 * @route   POST /api/user/logout
 * @access  Public
 */
export const logout = asyncHandler(async (_, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		sameSite: "lax",
		secure: config.NODE_ENV === "production",
	});
	return res.status(200).json(new ApiResponse(200, "User logged out"));
});
