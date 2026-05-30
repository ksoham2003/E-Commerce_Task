import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (id) =>
	jwt.sign({ id: id }, config.JWT_SECRET, {
		expiresIn: "1h",
	});

export default generateToken;
