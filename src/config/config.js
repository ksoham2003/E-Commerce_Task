import dotenv from "dotenv";

dotenv.config({ quiet: true });

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];

for (const key of requiredEnvVars) {
	if (!process.env[key]) {
		throw new Error(`Missing required environment variable: ${key}. Add it to your .env file.`);
	}
}

if (process.env.NODE_ENV === "production" && !process.env.CLIENT_URL && !process.env.CLIENT_URL_PROD) {
	throw new Error("Missing required environment variable: CLIENT_URL (or CLIENT_URL_PROD) in production.");
}

const config = {
	PORT: process.env.PORT || 8000,
	MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	CLIENT_URL: process.env.CLIENT_URL || process.env.CLIENT_URL_PROD,
	NODE_ENV: process.env.NODE_ENV || "",
};

export default config;
