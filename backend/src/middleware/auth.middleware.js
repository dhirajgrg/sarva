import userModel from "../models/user.models.js"
import jwt from "jsonwebtoken"

async function authMiddleware(req, res, next) {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).json({ message: "unauthorized" })
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

	const user = await userModel.findOne({ _id: decoded.id })
	if (!user) {
		return res.status(401).json({ message: "unauthorized" })
	}
	req.user = user

	next()
}

export default authMiddleware
