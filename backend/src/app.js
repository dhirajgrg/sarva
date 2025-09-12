import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"

import express from "express"
import authRoutes from "./routes/auth.routes.js"
import adsRoutes from "./routes/ads.routes.js"

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

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/ads", adsRoutes)

app.all("*", (req, res, next) => {
	res.status(404).json({
		status: "fail",
		message: `can't find ${req.originalUrl} on this server`,
	})
})

export default app
