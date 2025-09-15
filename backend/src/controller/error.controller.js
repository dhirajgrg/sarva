// controllers/errorController.js
import AppError from "../utils/appError.js"

// Development error response
const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	})
}

// Production error response
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

// Handle Mongo CastError (invalid _id)
const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`
	return new AppError(message, 400)
}

// Handle Mongo duplicate field error
const handleDuplicateFieldsDB = (err) => {
	const value = Object.values(err.keyValue)[0]
	const message = `Duplicate field value: ${value}. Please use another value!`
	return new AppError(message, 400)
}

// Handle Mongoose validation errors
const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message)
	const message = `Invalid input data. ${errors.join(". ")}`
	return new AppError(message, 400)
}

// GLOBAL ERROR HANDLER
const globalErrorHandler = function (err, req, res, next) {
	err.statusCode = err.statusCode || 500
	err.status = err.status || "error"

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res)
	} else if (process.env.NODE_ENV === "production") {
		// copy error and manually preserve message
		let error = err

		if (error.name === "CastError") error = handleCastErrorDB(error)
		if (error.code === 11000) error = handleDuplicateFieldsDB(error)
		if (error.name === "ValidationError")
			error = handleValidationErrorDB(error)

		sendErrorProd(error, res)
	}
}
export default globalErrorHandler
