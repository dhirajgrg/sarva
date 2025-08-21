import express from "express"
import multer from "multer"
import authMiddleware from "../middleware/auth.middleware.js"
import { register, login,logout } from "../controller/auth.controller.js"
import { createAds } from "../controller/createAds.controller.js"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post("/register", register)
router.post("/login", login)
router.post("/ads", authMiddleware, upload.single("image"), createAds)
router.get("/me", authMiddleware, (req, res) => res.json(req.user))
router.post("/logout", authMiddleware,logout )
export default router
