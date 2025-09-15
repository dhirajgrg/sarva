import AppError from "../utils/appError.js"
import catchAsync from "../utils/catchAsync.js"
import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})
}

// sign up
export const signUp = catchAsync(async (req, res, next) => {
	const { name, email, password, passwordConfirm } = req.body
	const user = await userModel.create({
		name,
		email,
		password,
		passwordConfirm,
	})

	const token = createToken(user._id)
	user.password = undefined
	res.status(201).json({
		status: "success",
		token,
		data: {
			user,
		},
	})
})

// login
export const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new AppError("Please provide email and password", 400))
	}

	const user = await userModel.findOne({ email }).select("+password")

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password", 401))
	}

	const token = createToken(user._id)

	user.password = undefined
	res.status(200).json({
		status: "success",
		token,
		data: { user },
	})
})
// logout user
export const logout = catchAsync(async (req, res, next) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	})
	res.status(200).json({ status: "success" })
})

export const getMe = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: "success",
		data: {
			user: req.user,
		},
	})
})
