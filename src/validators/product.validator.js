import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";

const createProductValidator = (data) => {
	const { name, price } = data;

	if (!name || typeof name !== "string" || name.trim().length === 0) {
		throw new ApiError(400, "Product name is required");
	}

	if (price === undefined || price === null || String(price).trim() === "") {
		throw new ApiError(400, "Product price is required");
	}

	const parsedPrice = Number(price);
	if (isNaN(parsedPrice) || parsedPrice < 0) {
		throw new ApiError(400, "Price must be a valid number (>= 0)");
	}
	data.price = parsedPrice;

	if (data.category && typeof data.category !== "string") {
		throw new ApiError(400, "Category must be a string");
	}

	if (data.description && typeof data.description !== "string") {
		throw new ApiError(400, "Description must be a string");
	}

	return data;
};

const updateProductValidator = (data) => {
	if (Object.keys(data).length === 0) {
		throw new ApiError(400, "At least one field is required to update");
	}

	if (data.name !== undefined) {
		if (typeof data.name !== "string" || data.name.trim().length === 0) {
			throw new ApiError(400, "Product name cannot be empty");
		}
	}

	if (data.price !== undefined) {
		if (String(data.price).trim() === "") {
			throw new ApiError(400, "Price cannot be empty");
		}
		const parsedPrice = Number(data.price);
		if (isNaN(parsedPrice) || parsedPrice < 0) {
			throw new ApiError(400, "Price must be a valid number (>= 0)");
		}
		data.price = parsedPrice;
	}

	if (data.category !== undefined && typeof data.category !== "string") {
		throw new ApiError(400, "Category must be a string");
	}

	if (data.description !== undefined && typeof data.description !== "string") {
		throw new ApiError(400, "Description must be a string");
	}

	return data;
};

const validateObjectId = (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid product ID");
	}
};

export { createProductValidator, updateProductValidator, validateObjectId };
