import ApiError from "../utils/apiError.js";

const registerValidator = (data) => {
	const { name, email, password } = data;
	if (!name || !email || !password) {
		throw new ApiError(400, "All fields are required");
	}
	return data;
};
const loginValidator = (data) => {
	const { email, password } = data;
	if (!email || !password) {
		throw new ApiError(400, "All fields are required");
	}
	return data;
};

export { registerValidator, loginValidator };
