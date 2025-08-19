import React from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import Home from "../pages/Home"
import { Routes, Route} from "react-router-dom"
import CreateADS from "../components/CreateADS"

const AppRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/ads" element={<CreateADS />} />
		</Routes>
	)
}

export default AppRoute
