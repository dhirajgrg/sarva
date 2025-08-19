import mongoose from "mongoose"

const adsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	caption: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
},{timestamps: true	})

const adsModel = mongoose.model("ads", adsSchema)
export default adsModel
