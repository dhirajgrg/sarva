import React from "react"
import Button from "./Button"
import { useNavigate } from "react-router-dom"
import authAPI from "../services/authAPI"
const menus = ["home", "contact", "about", "service"]

const Nav = () => {
	const navigate = useNavigate()
	const handleADS = async () => {
		try {
			await authAPI.get("/api/verify")
			navigate("/ads")
		} catch (error) {
			navigate("/login")
		}
	}
	const handleLogin = () => {
		navigate("/login")
	}
	return (
		<div className="flex justify-between items-center border-b-[1px] border-zinc-200 shadow-zinc-700 shadow-sm py-4 px-10">
			<div className="text-2xl font-bold text-zinc-700">SARVA</div>
			<div className="flex justify-between">
				<div className="flex justify-between items-center ">
					{menus.map((menu, i) => (
						<a className="mr-6 cursor-pointer" key={i}>
							{menu}
						</a>
					))}
				</div>
				<Button
					btnText="crete ADS"
					className="bg-green-800 hover:bg-green-600  mr-2 rounded-full text-white px-6 py-1 cursor-pointer"
					onClick={handleADS}
				/>
				<Button
					btnText="login"
					className="bg-blue-700 rounded-full text-white px-6 py-1 cursor-pointer"
					onClick={handleLogin}
				/>
			</div>
		</div>
	)
}

export default Nav
