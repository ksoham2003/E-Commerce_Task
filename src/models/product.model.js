import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			default: "",
		},
		price: {
			type: Number,
			required: [true, "Product price is required"],
			min: [0, "Price cannot be negative"],
		},
		category: {
			type: String,
			trim: true,
			lowercase: true,
			default: "",
		},
		images: {
			type: [String],
			default: [],
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true },
);

productSchema.index({ category: 1 });
productSchema.index({ createdBy: 1 });
productSchema.index({ isDeleted: 1 });
productSchema.index({ isDeleted: 1, createdAt: -1 });

const Product = mongoose.model("Product", productSchema);

export default Product;
