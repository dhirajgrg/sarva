require("dotenv").config() // ✅ Must be at the top

const connectDB = require("./src/db/db")
const app = require("./app")

const PORT = process.env.PORT || 5000

connectDB()

app.listen(PORT, () => console.log("server is listening on port 3000"))
