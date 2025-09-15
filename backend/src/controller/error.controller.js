import AppError from "../utils/appError.js"

// send error in development
const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	})
}

// send error in production
const sendErrorProd = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		})
	} else {
		console.error("ERROR 💥", err)
		res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		})
	}
}

// cast error (invalid ObjectId)
const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`
	return new AppError(message, 400)
}

//  mongoose validation error
const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message)
	const message = `Invalid input data. ${errors.join(". ")}`
	return new AppError(message, 400)
}

// GLOBAL ERROR HANDLER
const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500
	err.status = err.status || "error"

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res)
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err } // shallow copy
		error.message = err.message // preserve original message!

		if (err.name === "CastError") error = handleCastErrorDB(err)
		if (err.name === "ValidationError") error = handleValidationErrorDB(err)

		sendErrorProd(error, res)
	}
}

export default globalErrorHandler
