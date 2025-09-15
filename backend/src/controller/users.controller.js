import AppError from "../utils/appError.js"
import catchAsync from "../utils/catchAsync.js"
import userModel from "../model/user.model.js"

// get all users
export const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await userModel.find()
	res.status(200).json({
		status: "success",
		dataLength: users.length,
		data: {
			users,
		},
	})
})

// get one user
export const getOneUser = catchAsync(async (req, res, next) => {
	const { id } = req.params
	const user = await userModel.findById(id)
	if (!user) {
		return next(new AppError("User not found", 404))
	}
	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	})
})

// update user
export const updateUser = catchAsync(async (req, res, next) => {
	const { id } = req.params
	const user = await userModel.findByIdAndUpdate(id, req.body, {
		new: true,
	})
	if (!user) {
		return next(new AppError("User not found", 404))
	}
	res.status(200).json({
		status: "success",
		data: {
			user,
		},
	})
})

// delete user
export const deleteUser = catchAsync(async (req, res, next) => {
	const { id } = req.params
	const user = await userModel.findByIdAndDelete(id)
	if (!user) {
		return next(new AppError("User not found", 404))
	}
	res.status(204).json({
		status: "success",
		data: null,
	})
})
