import generateCaption from "../services/ai.services.js"

export async function posts(req, res) {
	try {
		const imagefile = req.file.buffer

		const base64Image = Buffer.from(imagefile).toString("base64")

		const caption = await generateCaption(base64Image)
		res.status(201).json({ message: "post created successfully", caption })
	} catch (error) {
		console.error("something wrong", error.message)
		res.status(400).json({ message: error.message })
	}
}
