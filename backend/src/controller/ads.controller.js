import adsModel from "../model/ads.model.js"
// import generateCaption from "../services/ai.service.js"
// import uploadImage from "../services/storage.service.js"
import apiFeatures from "../utils/apiFeatures.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import catchAsync from "../../src/utils/catchAsync.js"
import AppError from "../utils/appError.js"
// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataFilePath = path.join(__dirname, "../../data/ads-data.json")

// import data json
export const importData = catchAsync(async (req, res, next) => {
	await adsModel.deleteMany({})
	console.log("Old data deleted ✅")
	const jsonData = fs.readFileSync(dataFilePath, "utf-8")
	const data = JSON.parse(jsonData)

	await adsModel.insertMany(data)

	res.json({ message: "Data imported successfully" })
})

// create ads
export const createAds = catchAsync(async (req, res, next) => {
	const { title, description, price, location, category, image, caption } =
		req.body
	// const imagefile = req.file.buffer
	// const base64Image = Buffer.from(imagefile).toString("base64")

	// generate caption fro AI
	// const caption = await generateCaption(base64Image)

	// upload to imagekit
	// const upload = await uploadImage(imagefile, "ads-folder")

	// save to mongodb
	const newAds = await adsModel.create({
		title,
		description,
		price,
		location,
		category,
		image,
		caption,
		// user: req.user._id,
	})
	res.status(201).json({
		message: "post created successfully",
		newAds,
	})
})

// get all ads

export const getAllAds = catchAsync(async (req, res, next) => {
	const features = new apiFeatures(adsModel.find(), req.query)
		.search()
		.filter()
		.sort()
		.limitFields()

	await features.paginate()
	// execute query
	const adsData = await features.query.clone()
	console.log(adsData)

	res.status(200).json({
		status: "success",
		result: adsData.length,
		data: adsData,
	})
})

export const getOneAds = catchAsync(async (req, res, next) => {
	const adsData = await adsModel.findById(req.params.id)
	if (!adsData) {
		return next(new AppError("Ads not found with that ID", 404))
	}
	res.status(200).json({
		status: "success",
		data: adsData,
	})
})

export const updateAds = catchAsync(async (req, res, next) => {
	const adsData = await adsModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})
	if (!adsData) {
		return next(new AppError("Ads not found with that ID", 404))
	}

	res.status(200).json({
		status: "success",
		data: adsData,
	})
})

export const deleteAds = catchAsync(async (req, res, next) => {
	const adsData = await adsModel.findByIdAndDelete(req.params.id)
	res.status(200).json({
		status: "success",
		data: adsData,
	})
	if (!adsData) {
		return next(new AppError("Ads not found with that ID", 404))
	}
	res.status(204).json({
		status: "success",
		data: null,
	})
})
