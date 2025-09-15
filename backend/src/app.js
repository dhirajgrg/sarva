import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import adsRoutes from "./routes/ads.routes.js"
import usersRoutes from "./routes/users.routes.js"
import authRoutes from "./routes/auth.routes.js"
import AppError from "./utils/appError.js"
import globalErrorHandler from "./controller/error.controller.js"

const app = express()
// query parser
app.set("query parser", "extended")
// dev log
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"))
}
app.use(express.json())
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)
app.use(cookieParser())
// main routes of app
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", usersRoutes)
app.use("/api/v1/ads", adsRoutes)
// error handle middleware
app.all("*", (req, res, next) => {
	next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})
// global error handler
app.use(globalErrorHandler)

export default app
