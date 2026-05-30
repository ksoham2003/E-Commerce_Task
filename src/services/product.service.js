import Product from "../models/product.model.js";
import ApiError from "../utils/apiError.js";
import {
	createProductValidator,
	updateProductValidator,
	validateObjectId,
} from "../validators/product.validator.js";

const getAllProductsService = async (query) => {
	const filter = {};

	if (query.category) {
		filter.category = query.category.toLowerCase();
	}

	const products = await Product.find(filter).sort({ createdAt: -1 });
	return products;
};

const getProductByIdService = async (id) => {
	validateObjectId(id);

	const product = await Product.findById(id);
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

const updateProductService = async (id, data) => {
	validateObjectId(id);
	const validatedData = updateProductValidator(data);

	const product = await Product.findByIdAndUpdate(id, validatedData, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		throw new ApiError(404, "Product not found");
	}

	return product;
};

const deleteProductService = async (id) => {
	validateObjectId(id);

	const product = await Product.findByIdAndDelete(id);
	if (!product) {
		throw new ApiError(404, "Product not found");
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
