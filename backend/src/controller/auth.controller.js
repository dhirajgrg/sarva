import jwt from "jsonwebtoken"
import userModel from "../model/user.model.js"
import bcrypt from "bcrypt"

export async function register(req, res) {
	try {
		const { email, password } = req.body

		if (!email || !password)
			return res
				.status(400)
				.json({ message: "email or password not found" })

		const userExist = await userModel.findOne({ email })

		if (userExist)
			return res.status(400).json({ message: "user already exists" })

		const hashPassword = await bcrypt.hash(password, 10)

		// save to mongo db
		const user = await userModel.create({
			email,
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
		const { email, password } = req.body

		const user = await userModel.findOne({ email })

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
export const logout = async (req, res) => {
	// Clear the token cookie
	await res.clearCookie("token")

	res.status(200).json({
		success: true,
		message: "Logout successful",
	})
}
