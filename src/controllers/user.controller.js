import config from "../config/config.js";
import asyncHandler from "../middlewares/async.handler.js";
import { loginService, registerService } from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";

export const register = asyncHandler(async (req, res) => {
	const { token, safeUser } = await registerService(req.body);

	res.cookie("token", token, {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 60 * 1000,
		secure: config.NODE_ENV === "production",
	});

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

export const login = asyncHandler(async (req, res) => {
	const { token, safeUser } = await loginService(req.body);

	res.cookie("token", token, {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 60 * 60 * 1000,
		secure: config.NODE_ENV === "production",
	});

	return res
		.status(200)
		.json(new ApiResponse(200, "User LoggedIn successfully", safeUser));
});

export const   logout = asyncHandler(async (_, res) => {
	res.clearCookie("token", {
		httpOnly: true,
		sameSite: "lax",
		secure: config.NODE_ENV === "production",
	});
	return res.status(200).json(new ApiResponse(200, "User LoggedOut"));
});
