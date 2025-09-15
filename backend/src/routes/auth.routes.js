import express from "express"
import authmiddleware from "../middleware/auth.middleware.js"
import { signUp, login, logout, getMe } from "../controller/auth.controller.js"

const router = express.Router()

router.post("/signup", signUp)
router.post("/login", login)
router.post("/logout", logout)
router.post("/me", authmiddleware, getMe)

export default router
