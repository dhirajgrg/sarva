import adsModel from "../model/ads.model.js"
import generateCaption from "../services/ai.service.js"
import uploadImage from "../services/storage.service.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFilePath = path.join(__dirname, "../../data/ads-data.json")

// import data json
export async function importData(req, res) {
	try {
		await adsModel.deleteMany({})
		console.log("Old data deleted ✅")
		const jsonData = fs.readFileSync(dataFilePath, "utf-8")
		const data = JSON.parse(jsonData)

		await adsModel.insertMany(data)

		res.json({ message: "Data imported successfully" })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error importing data", error })
	}
}

// create ads
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

// get all ads
export async function getAllAds(req, res) {
	try {
		console.log(req.query)
		const { search, description, minPrice, maxPrice, location, category } =
			req.query

		let filter = {}
		if (search) {
			const searchArray = search.split(",").map((el) => el.trim())
			filter.$or = searchArray.flatMap((el) => [
				{ title: { $regex: el, $options: "i" } },
				{ description: { $regex: el, $options: "i" } },
			])
		}
		if (description) {
			filter.description = description
		}
		if (minPrice || maxPrice) {
			filter.price = {}
			if (minPrice) {
				filter.price.$gte = Number(minPrice)
			}
			if (maxPrice) {
				filter.price.$lte = Number(maxPrice)
			}
		}
		if (location) {
			const locationArray = location
				.split(",")
				.map((el) => new RegExp(el, "i"))
			filter.location = { $in: locationArray }
		}
		if (category) {
			filter.category = category
		}

		const ads = await adsModel
			.find(filter)
			.select("-createdAt -updatedAt -__v")

		res.status(200).json({
			status: "success",
			results: ads.length,
			data: {
				ads,
			},
		})
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error,
		})
	}
}

export async function getOneAds(req, res) {
	try {
		const adsData = await adsModel.findById(req.params.id)
		res.status(200).json({
			status: "success",
			data: adsData,
		})
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error,
		})
	}
}

export async function updateAds(req, res) {
	try {
		const adsData = await adsModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)
		res.status(200).json({
			status: "success",
			data: adsData,
		})
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error,
		})
	}
}

export async function deleteAds(req, res) {
	try {
		const adsData = await adsModel.findByIdAndDelete(req.params.id)
		res.status(200).json({
			status: "success",
			data: adsData,
		})
	} catch (error) {
		res.status(400).json({
			status: "fail",
			message: error,
		})
	}
}
