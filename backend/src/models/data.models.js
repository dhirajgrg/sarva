import mongoose from "mongoose"
const dataSchema = new mongoose.Schema({
	title: String,
	description: String,
	category: String,
	location: String,
	price: Number,
	imageUrl: String,
})

const dataModel = mongoose.model("data", dataSchema)
export default dataModel
