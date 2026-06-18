import chalk from "chalk";
import fs from "fs";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/database.js";

async function startServer() {
	try {
		if (!fs.existsSync("uploads")) {
			fs.mkdirSync("uploads", { recursive: true });
		}

		await connectDB();

		app.listen(config.PORT, () => {
			console.log(chalk.bgCyan(`Server is running on port ${config.PORT}`));
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
}

startServer();

export default app;
