import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			lowercase: true,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			lowercase: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: [6, "Minimum 6 characters are required"],
			select: false,
		},
	},
	{ timestamps: true },
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
	return bcrypt.compare(password, this.password);
};

userSchema.methods.toSafeObject = function () {
	const obj = this.toObject();
	delete obj.password;
	delete obj.__v;
	return obj;
};

const User = mongoose.model("User", userSchema);

export default User;
