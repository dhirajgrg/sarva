import express from "express"
import authmiddleware from "../middleware/auth.middleware.js"
import restrictTo from "../middleware/restrictTo.middleware.js"
import {
	getOneUser,
	updateUser,
	deleteUser,
	getAllUsers,
} from "../controller/users.controller.js"

const router = express.Router()
router.use(authmiddleware)
// for admin only
router.use(restrictTo("admin"))
router.get("/", getAllUsers)
// protect routes
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser)

export default router
