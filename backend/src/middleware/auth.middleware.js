import userModel from "../model/user.model.js"
import jwt from "jsonwebtoken"

async function authMiddleware(req, res, next) {
	const token = req.cookies.token
	if (!token) {
		return res.status(401).json({ message: "unauthorized" })
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

	const user = await userModel.findOne(decoded.id).select("-password")
	if (!user) {
		return res.status(401).json({ message: "unauthorized" })
	}
	req.user = user

	next()
}

export default authMiddleware
