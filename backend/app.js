require("dotenv").config() // ✅ Must be at the top

const express = require("express")
const app = express()
const dataRoutes = require("./src/routes/data.routes")

app.use(express.json())

app.use("/", dataRoutes)

module.exports = app
