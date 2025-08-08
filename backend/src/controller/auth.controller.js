import jwt from "jsonwebtoken"
import userModel from "../models/user.models.js"
import bcrypt from "bcrypt"

export async function register(req, res) {
	try {
		const { username, password } = req.body

		if (!username || !password)
			return res
				.status(400)
				.json({ message: "username or password not found" })

		const userExist = await userModel.findOne({ username })
		if (userExist)
			return res.status(400).json({ message: "user already exist" })

		const hashPassword = await bcrypt.hash(password, 10)

		const user = await userModel.create({
			username,
			password: hashPassword,
		})
		if (!user) return res.status(400).json({ message: "user not created" })

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
		res.cookie("token", token)

		res.status(201).json({
			message: "user created successfully",
			user,
		})
	} catch (error) {
		console.error("something wrong", error.message)
		res.status(400).json({ message: error.message })
	}
}

export async function login(req, res) {
	try {
		const { username, password } = req.body

		const hashPassword = bcrypt.hash(password)
		const user = await userModel.findOne({ username })

		if (!user) return res.status(400).json({ message: "user not found" })

		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword)
			return res.status(400).json({ message: "password not match" })

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
		res.cookie("token", token)

		res.status(201).json({
			message: "user login successfully",
			user,
		})
	} catch (error) {
		console.error("something wrong", error.message)
		res.status(400).json({ message: error.message })
	}
}
