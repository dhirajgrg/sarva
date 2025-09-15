import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please tell us your name!"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Please provide your email"],
			unique: true,
			lowercase: true,
			trim: true,
			validate: [validator.isEmail, "Please provide a valid email"],
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: 8,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, "Please confirm your password"],
			validate: {
				// only works on CREATE and SAVE
				validator: function (el) {
					return el === this.password
				},
				message: "Passwords are not the same!",
			},
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
			passwordChangedAt: Date,
		},
	},
	{ timestamps: true }
)

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next()
	this.password = await bcrypt.hash(this.password, 12)
	this.passwordConfirm = undefined
	next()
})
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword)
}
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		)
		return changedTimestamp > JWTTimestamp
	}
	// False means NOT changed
	return false
}

const userModel = mongoose.model("User", userSchema)
export default userModel
