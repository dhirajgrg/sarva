import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import cors from "cors"
import cookie from "cookie-parser"
import express from "express"
import authRoutes from "./routes/auth.routes.js"
import adsRoutes from "./routes/ads.routes.js"
import qs from "qs"

const app = express()



app.use((req, res, next) => {
	// parse nested query into a separate object
	req.parsedQuery = qs.parse(req.originalUrl.split("?")[1] || "")
	next()
})


app.use(morgan("dev"))
app.use(express.json())
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)
app.use(cookie())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/ads", adsRoutes)

export default app
