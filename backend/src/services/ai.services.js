import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
})

async function generateCaption(base64Image) {
	const contents = [
		{
			inlineData: {
				mimeType: "image/jpeg",
				data: base64Image,
			},
		},
		{ text: "Caption this image." },
	]

	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: contents,
		config: {
			systemInstruction:
				"genarate catch vey short caption with emojis and hastags",
		},
	})
	console.log(response.text)
}
export default generateCaption
