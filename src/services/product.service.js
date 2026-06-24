import fs from "fs/promises";
import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import {
	createProductValidator,
	updateProductValidator,
	validateObjectId,
} from "../validators/product.validator.js";

const getAllProductsService = async (query) => {
	const filter = { isDeleted: { $ne: true } };

	if (query.category) {
		filter.category = query.category.toLowerCase();
	}

	const page = Math.max(1, parseInt(query.page) || 1);
	const limit = Math.min(50, Math.max(1, parseInt(query.limit) || 10));
	const skip = (page - 1) * limit;

	const [products, total] = await Promise.all([
		Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
		Product.countDocuments(filter),
	]);

	return {
		products,
		pagination: {
			page,
			limit,
			total,
			pages: Math.ceil(total / limit),
		},
	};
};

const getProductByIdService = async (id) => {
	validateObjectId(id);

	const product = await Product.findOne({ _id: id, isDeleted: { $ne: true } });
	if (!product) {
		throw new ApiError(404, "Product not found");
	}

	return product;
};

const createProductService = async (data, userId) => {
	const validatedData = createProductValidator(data);

	const product = await Product.create({
		...validatedData,
		createdBy: userId,
	});

	return product;
};

const updateProductService = async (id, data, userId) => {
	validateObjectId(id);
	const validatedData = updateProductValidator(data);

	const existingProduct = await Product.findOne({ _id: id, isDeleted: { $ne: true } });
	if (!existingProduct) {
		throw new ApiError(404, "Product not found");
	}

	if (existingProduct.createdBy.toString() !== userId.toString()) {
		throw new ApiError(403, "Not authorized to update this product");
	}

	if (validatedData.images && existingProduct.images.length > 0) {
		for (const filename of existingProduct.images) {
			try {
				await fs.unlink(`uploads/${filename}`);
			} catch {
				// File may already be deleted; ignore
			}
		}
	}

	const product = await Product.findByIdAndUpdate(id, validatedData, {
		new: true,
		runValidators: true,
	});

	return product;
};

const deleteProductService = async (id, userId) => {
	validateObjectId(id);

	const product = await Product.findOneAndUpdate(
		{ _id: id, isDeleted: { $ne: true } },
		{
			isDeleted: true,
			deletedAt: new Date(),
		},
		{ new: true },
	);

	if (!product) {
		throw new ApiError(404, "Product not found");
	}

	if (product.createdBy.toString() !== userId.toString()) {
		throw new ApiError(403, "Not authorized to delete this product");
	}

	return product;
};

export {
	getAllProductsService,
	getProductByIdService,
	createProductService,
	updateProductService,
	deleteProductService,
};
