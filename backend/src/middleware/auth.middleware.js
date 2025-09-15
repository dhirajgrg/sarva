import catchAsync from "../utils/catchAsync.js"
import jwt from "jsonwebtoken"
import { promisify } from "util"
import userModel from "../model/user.model.js"
import AppError from "../utils/appError.js"

const authMiddleWare = catchAsync(async (req, res, next) => {
	const { token } = req.cookies
	if (!token) {
		return next(
			new AppError(
				"You are not logged in! Please log in to get access.",
				401
			)
		)
	}
	const decoded = await promisify(jwt.verify)(
		token,
		process.env.JWT_SECRET_KEY
	)
	const currentUser = await userModel.findById(decoded.id)
	if (!currentUser) {
		return next(
			new AppError(
				"The user belonging to this token no longer exists.",
				401
			)
		)
	}
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError(
				"User recently changed password! Please log in again.",
				401
			)
		)
	}
	req.user = currentUser
	next()
})
export default authMiddleWare
