import generateCaption from "../services/ai.service.js"
import adsModel from "../model/ads.model.js"
import uploadImage from "../services/storage.service.js"

export async function createAds(req, res) {
	try {
		const { title, description, price, location, category } = req.body
		const imagefile = req.file.buffer
		const base64Image = Buffer.from(imagefile).toString("base64")

		// generate caption fro AI
		const caption = await generateCaption(base64Image)

		// upload to imagekit
		const upload = await uploadImage(imagefile, "ads-folder")

		// save to mongodb
		const newAds = await adsModel.create({
			title,
			description,
			price,
			location,
			category,
			image: upload.url,
			caption,
			user: req.user._id,
		})
		res.status(201).json({
			message: "post created successfully",
			newAds,
		})
	} catch (error) {
		console.error("something wrong", error.message)
		res.status(400).json({ message: error.message })
	}
}
