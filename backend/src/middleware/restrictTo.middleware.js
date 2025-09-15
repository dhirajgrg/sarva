import AppError from "../utils/appError.js"

const restrictTo = (...roles) => {
	return (req, res, next) => {
		// req.user must be set by authMiddleware
		if (!req.user) {
			return next(new AppError("You are not logged in!", 401))
		}

		if (!roles.includes(req.user.role)) {
			return next(
				new AppError(
					"You do not have permission to perform this action",
					403
				)
			)
		}
		next()
	}
}

export default restrictTo
