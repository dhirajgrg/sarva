const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
	title: String,
	description: String,
	category: String,
	location: String,
	price: Number,
	imageUrl: String,
})

module.exports = mongoose.model("data", dataSchema)
