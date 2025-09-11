import express from "express"
import multer from "multer"
import {
	getAllAds,
	createAds,
	importData,
	getOneAds,
	updateAds,
	deleteAds,
} from "../controller/ads.controller.js"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })
// import data
router.route("/import").post(importData)
// ads
router.route("/").get(getAllAds).post(upload.single("image"), createAds)
// single ads
router.route("/:id").get(getOneAds).put(updateAds).delete(deleteAds)


export default router
