import chalk from "chalk";
import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(config.MONGO_URI, {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		});
		console.log(chalk.bgGreen("Database connected"));
		return conn;
	} catch (error) {
		const msg = error?.message || "";

		if (msg.includes("bad auth") || msg.includes("Authentication failed")) {
			console.error(
				chalk.bgYellow(
					"Invalid MongoDB URI. Please update your .env file before starting the server.",
				),
			);
		} else if (msg.includes("ENOTFOUND")) {
			console.error(
				chalk.bgRed(
					"MongoDB host not found. Check your internet connection or cluster name.",
				),
			);
		} else {
			console.error(`Database Error: ${msg}`);
		}

		process.exit(1);
	}
};

export default connectDB;
