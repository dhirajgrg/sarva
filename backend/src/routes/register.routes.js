const express = require("express")
const router = express.Router()
const userModel = require("../models/user.models")

router.post("/register", async (req, res) => {
	try {
		const { name, password } = req.body
		const user = await userModel.create({ name, password })
		if (!user) return res.status(400).json({ message: "user not created" })
		if (!password)
			return res.status(400).json({ message: "password not created" })
		res.status(201).json({
			message: "user created successfully",
			user,
		})
	} catch (error) {
		console.error("something wrong", message.error)
		res.status(400).json({ message: "something wrong" })
	}
})
module.exports = router
