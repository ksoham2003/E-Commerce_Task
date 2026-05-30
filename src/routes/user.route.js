import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";

const router = Router();

// Health check
router.get("/check", (_, res) => {
	res.send("User route is working");
});

/**
 * path: /api/user/register (POST)
 * des: User register in database and gets a token in cookies
 */
router.post("/register", register);

/**
 * path: /api/user/login (POST)
 * des: User gets a token in cookies
 */
router.post("/login", login);

/**
 * path: /api/user/logout (POST)
 * des: Token removes from cookies
 */
router.post("/logout", logout);

export default router;
