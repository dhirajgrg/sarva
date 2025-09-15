import express from "express"
// import multer from "multer"
import authMiddleWare from "../middleware/auth.middleware.js"

import {
	getAllAds,
	createAds,
	importData,
	getOneAds,
	updateAds,
	deleteAds,
} from "../controller/ads.controller.js"

const router = express.Router()

// const upload = multer({ storage: multer.memoryStorage() })
// import data
router.route("/import").post(importData)
// public routes
router.get("/", getAllAds)
router.get("/:id", getOneAds)
// private routes
router.use(authMiddleWare)
router.post("/", createAds)
router.route("/:id").put(updateAds).delete(deleteAds)

export default router
