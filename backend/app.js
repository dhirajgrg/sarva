const express = require("express")
const app = express()
const User = require("./models/model")

app.use(express.json())

app.post("/api", async (req, res) => {
	try {
		const newUser = await User.create(req.body)
		res.status(201).json({ newUser })
	} catch (error) {
		console.error("fail to create user", error.message)
		res.status(500).json({ error: error.message })
	}
})

app.get("/api", async (req, res) => {
	try {
		const user = await User.find()
		res.json({ message: "GET received", user }) // GET has no body
	} catch (error) {
		console.error("fail to get user", error.message)
		res.status(500).json({ error: error.message })
	}
})

app.delete("/api/:id", async (req, rea) => {
	try {
		const { id } = req.params
		const deleteUser = await User.findByIdAndDelete(id)
		if (!deleteUser) {
			res.status(404).json({ message: "user not found" })
		}
		res.status(200).json({ message: "user deleted" })
	} catch (error) {}
})

module.exports = app
