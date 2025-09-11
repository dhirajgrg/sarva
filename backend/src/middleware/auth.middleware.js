async function authMiddleware(req, res, next) {
	try {
		const token = req.cookies.token
		if (!token) {
			return res.status(401).json({ message: "unauthorized" })
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

		const user = await userModel
			.findOne({ _id: decoded.id })
			.select("-password")
		if (!user) {
			return res.status(401).json({ message: "unauthorized" })
		}
		req.user = user
		next()
	} catch (err) {
		return res
			.status(401)
			.json({ message: "unauthorized", error: err.message })
	}
}

export default authMiddleware