const express = require("express")
const multer = require("multer")
const imagekit = require("../services/imagekit")

const Data = require("../models/data.models")

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post("/upload", upload.single("image"), async (req, res) => {
	try {
		// destructure data from req.body

		const { title, price, description, category, location } = req.body
		const file = req.file
		// console.log(file)
		if(!file) res.status(400).json({ message: "No file uploaded" })
		// upload image to imagekit
		const uploadImage = await imagekit.upload({
			file: file.buffer,
			fileName: file.originalname,
			folder: "sarva",
		})

		// save to data as string to mongo db
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
		res.status(500).json({ "something went wrong": error.message })
	}
})

module.exports = router
