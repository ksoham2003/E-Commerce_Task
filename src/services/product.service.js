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

	const products = await Product.find(filter).sort({ createdAt: -1 });
	return products;
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

const updateProductService = async (id, data) => {
	validateObjectId(id);
	const validatedData = updateProductValidator(data);

	const product = await Product.findOneAndUpdate(
		{ _id: id, isDeleted: { $ne: true } },
		validatedData,
		{
			new: true,
			runValidators: true,
		},
	);

	if (!product) {
		throw new ApiError(404, "Product not found");
	}

	return product;
};

const deleteProductService = async (id) => {
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

	return product;
};

export {
	getAllProductsService,
	getProductByIdService,
	createProductService,
	updateProductService,
	deleteProductService,
};
