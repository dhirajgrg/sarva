import dotenv from "dotenv"
dotenv.config()
import { v4 as uuid } from "uuid"
import imagekit from "imagekit"
const imageKIT = new imagekit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

const uploadImage = async (image, folder) => {
	const result = await imageKIT.upload({
		file: image,
		fileName: `${uuid()}.jpg`,
		folder: folder,
	})
	return result
}

export default uploadImage
