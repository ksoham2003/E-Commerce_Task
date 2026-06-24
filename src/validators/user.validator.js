import ApiError from "../utils/apiError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerValidator = (data) => {
	const { name, email, password } = data;
	if (!name || !email || !password) {
		throw new ApiError(400, "All fields are required");
	}
	if (!EMAIL_REGEX.test(email)) {
		throw new ApiError(400, "Invalid email format");
	}
	return data;
};

const loginValidator = (data) => {
	const { email, password } = data;
	if (!email || !password) {
		throw new ApiError(400, "All fields are required");
	}
	if (!EMAIL_REGEX.test(email)) {
		throw new ApiError(400, "Invalid email format");
	}
	return data;
};

export { registerValidator, loginValidator };
