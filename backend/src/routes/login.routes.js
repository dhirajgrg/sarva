const express = require("express")
const router = express.Router()
const userModel = require("../models/user.models")

router.post("/login", async (req, res) => {
	try {
		const { name, password } = req.body

		const user = await userModel.findOne({ name })

		if (!user) return res.status(400).json({ message: "user not found" })
		const userPassword = password === user.password
		if (!userPassword)
			return res.status(400).json({ message: "password not match" })

		res.status(201).json({
			message: "user login successfully",
			user,
		})
	} catch (error) {
		console.error("something wrong", message.error)
		res.status(400).json({ message: "something wrong" })
	}
})
module.exports = router
