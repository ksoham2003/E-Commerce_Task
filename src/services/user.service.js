import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import generateToken from "../utils/token.js";
import { loginValidator, registerValidator } from "../validators/user.validator.js";

const registerService = async (data) => {
	const { name, email, password } = registerValidator(data);

	const user = await User.findOne({ email });
	if (user) {
		throw new ApiError(400, "User already exists");
	}

	const newUser = await User.create({
		name,
		email,
		password,
	});

	const token = generateToken(newUser._id);
	const safeUser = newUser.toSafeObject();

	return {
		token,
		safeUser,
	};
};

const loginService = async (data) => {
	const { email, password } = loginValidator(data);

	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new ApiError(400, "Invalid credentials");
	}

	const validatePassword = await user.comparePassword(password);
	if (!validatePassword) {
		throw new ApiError(400, "Invalid credentials");
	}

	const token = generateToken(user._id);
	const safeUser = user.toSafeObject();

	return {
		token,
		safeUser,
	};
};

export { registerService, loginService };
