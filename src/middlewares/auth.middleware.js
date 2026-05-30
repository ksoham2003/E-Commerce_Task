import jwt from "jsonwebtoken";
import config from "../config/config.js";
import ApiError from "../utils/apiError.js";

const authMiddleware = (req, _, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			throw new ApiError(401, "token not found");
		}

		const decode = jwt.verify(token, config.JWT_SECRET);

		if (!decode) {
			throw new ApiError(401, "Unauthorized");
		}

		req.user = decode.id;
		next();
	} catch (error) {
		next(error);
	}
};

export default authMiddleware;
