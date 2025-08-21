import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import cookie from "cookie-parser"
import express from "express"
import authRoutes from "./routes/auth.routes.js"
const app = express()
app.use(express.json())
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)
app.use(cookie())

app.use("/api/v1/auth", authRoutes)

export default app
