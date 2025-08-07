require("dotenv").config()

const express = require("express")
const app = express()
const dataRoutes = require("./src/routes/data.routes")
const registerRoutes = require("./src/routes/register.routes")
const loginRoutes = require("./src/routes/login.routes")
app.use(express.json())

app.use("/", dataRoutes)
app.use("/", registerRoutes)
app.use("/", loginRoutes)

module.exports = app
