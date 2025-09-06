import express from "express"
import multer from "multer"
import {
	getAllAds,
	createAds,
	importData,
    getOneAds,
    updateAds,
    deleteAds
} from "../controller/ads.controller.js"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

router.route("/").get(getAllAds).post(upload.single("image"), createAds)

router.route("/:id").get(getOneAds).put(updateAds).delete(deleteAds)
router.route("/import").post(importData)
export default router
