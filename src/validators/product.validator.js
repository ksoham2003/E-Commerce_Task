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

	if (data.category && typeof data.category !== "string") {
		throw new ApiError(400, "Category must be a string");
	}

	if (data.description && typeof data.description !== "string") {
		throw new ApiError(400, "Description must be a string");
	}

	return {
		...data,
		price: parsedPrice,
	};
};

const updateProductValidator = (data) => {
	if (Object.keys(data).length === 0) {
		throw new ApiError(400, "At least one field is required to update");
	}

	const result = { ...data };

	if (result.name !== undefined) {
		if (typeof result.name !== "string" || result.name.trim().length === 0) {
			throw new ApiError(400, "Product name cannot be empty");
		}
	}

	if (result.price !== undefined) {
		if (String(result.price).trim() === "") {
			throw new ApiError(400, "Price cannot be empty");
		}
		const parsedPrice = Number(result.price);
		if (isNaN(parsedPrice) || parsedPrice < 0) {
			throw new ApiError(400, "Price must be a valid number (>= 0)");
		}
		result.price = parsedPrice;
	}

	if (result.category !== undefined && typeof result.category !== "string") {
		throw new ApiError(400, "Category must be a string");
	}

	if (result.description !== undefined && typeof result.description !== "string") {
		throw new ApiError(400, "Description must be a string");
	}

	return result;
};

const validateObjectId = (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError(400, "Invalid product ID");
	}
};

export { createProductValidator, updateProductValidator, validateObjectId };
