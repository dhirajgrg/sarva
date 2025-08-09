import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"
dotenv.config()

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
		{
			text: "caption",
		},
	]
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: contents,
		config: {
			systemInstruction:
				"genarate only one very short sentence caption with emojis and hastags",
		},
	})
		return response.text
}
export default generateCaption
