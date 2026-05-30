import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (JWT required)
router.post("/", authMiddleware, upload.array("images", 5), createProduct);
router.put("/:id", authMiddleware, upload.array("images", 5), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
