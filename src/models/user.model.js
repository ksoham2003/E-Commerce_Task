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
		},
	},
	{ timestamps: true },
);
userSchema.pre("save", function () {
	this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
