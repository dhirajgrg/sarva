import express from "express"
import multer from "multer"
import authMiddleware from "../middleware/auth.middleware.js"
import { register, login } from "../controller/auth.controller.js"
import { posts } from "../controller/posts.controller.js"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.post("/register", register)
router.post("/login", login)
router.post("/posts", authMiddleware, upload.single("image"), posts)
export default router
