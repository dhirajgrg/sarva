

export async function register(req, res) {
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
}

export async function login(req, res) {
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
}
