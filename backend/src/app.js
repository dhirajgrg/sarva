import dotenv from "dotenv"
dotenv.config()

import express from "express"
import authRoutes from "./routes/auth.routes.js"
const app = express()

app.use("/auth", authRoutes)
app.use(express.json())

export default app
