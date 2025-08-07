const mongoose = require("mongoose")

const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => console.log("connected to DB"))
		.catch((error) => console.error("fail to connect to DB", error.message))
}

module.exports = connectDB
