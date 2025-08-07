// routes/upload.route.js
import express from "express"
import multer from "multer"
import imagekit from "../services/imagekit.js"
import Data from "../models/data.models.js"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post("/upload", upload.single("image"), async (req, res) => {
	try {
		const { title, price, description, category, location } = req.body
		const file = req.file

		if (!file) {
			return res.status(400).json({ message: "No file uploaded" })
		}

		// Upload to ImageKit
		const uploadImage = await imagekit.upload({
			file: file.buffer,
			fileName: file.originalname,
			folder: "sarva",
		})

		// Save to MongoDB
		const newData = await Data.create({
			title,
			description,
			category,
			location,
			imageUrl: uploadImage.url,
			price,
		})

		res.status(201).json({ message: "success", data: newData })
	} catch (error) {
		console.error(error)
		res.status(500).json({
			message: "Something went wrong",
			error: error.message,
		})
	}
})

export default router
