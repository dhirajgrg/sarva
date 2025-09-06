import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { register, login,logout } from "../controller/auth.controller.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", authMiddleware, (req, res) => res.json(req.user))
router.post("/logout", authMiddleware,logout )
export default router
