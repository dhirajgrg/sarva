import dotenv from "dotenv"
dotenv.config()
import connectDB from "./src/db/db.js"
import app from "./src/app.js"

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => console.log("server is listening on port 3000"))
