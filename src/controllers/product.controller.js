import asyncHandler from "../middlewares/async.handler.js";
import {
	getAllProductsService,
	getProductByIdService,
	createProductService,
	updateProductService,
	deleteProductService,
} from "../services/product.service.js";
import ApiResponse from "../utils/apiResponse.js";

/**
 * @desc    Get all products (with optional category filter and pagination)
 * @route   GET /api/products?category=electronics&page=1&limit=10
 * @access  Public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
	const result = await getAllProductsService(req.query);

	return res
		.status(200)
		.json(
			new ApiResponse(200, "Products fetched successfully", result),
		);
});

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
	const product = await getProductByIdService(req.params.id);

	return res
		.status(200)
		.json(
			new ApiResponse(200, "Product fetched successfully", product),
		);
});

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (JWT required)
 */
export const createProduct = asyncHandler(async (req, res) => {
	const productData = { ...req.body };

	// attach uploaded image paths if files exist
	if (req.files && req.files.length > 0) {
		productData.images = req.files.map((file) => file.filename);
	}

	const product = await createProductService(productData, req.user);

	return res
		.status(201)
		.json(
			new ApiResponse(201, "Product created successfully", product),
		);
});

/**
 * @desc    Update a product by ID
 * @route   PUT /api/products/:id
 * @access  Private (JWT required)
 */
export const updateProduct = asyncHandler(async (req, res) => {
	const updateData = { ...req.body };

	if (req.files && req.files.length > 0) {
		updateData.images = req.files.map((file) => file.filename);
	}

	const product = await updateProductService(req.params.id, updateData, req.user);

	return res
		.status(200)
		.json(
			new ApiResponse(200, "Product updated successfully", product),
		);
});

/**
 * @desc    Delete a product by ID
 * @route   DELETE /api/products/:id
 * @access  Private (JWT required)
 */
export const deleteProduct = asyncHandler(async (req, res) => {
	await deleteProductService(req.params.id, req.user);

	return res
		.status(200)
		.json(new ApiResponse(200, "Product deleted successfully"));
});
