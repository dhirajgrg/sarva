import React, { useState } from "react"
import authAPI from "../services/authAPI"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("") // reset previous error

		try {
			const newUser = { email, password }
			await authAPI.post(`/api/register`, newUser)

			toast.success("User registered successfully!")
			setEmail("")
			setPassword("")
			navigate("/login")
		} catch (err) {
			// Axios error object uses `response`
			if (err.response && err.response.data) {
				setError(err.response.data.message) // <-- show backend error
			} else {
				setError("Network error. Please try again.")
			}
		}
	}
	const goBack = () => {
		navigate("/")
	}
	return (
		<div className="flex justify-center items-center h-screen bg-white px-6 md:px-0">
			<div className="bg-green-800 relative text-white shadow-md rounded-lg p-6 w-full max-w-sm">
				<div
					className=" absolute top-1 left-3 text-3xl w-10 text-center cursor-pointer "
					onClick={goBack}>
					&larr;{" "}
				</div>
				<h1 className="text-2xl font-bold  text-center mb-6">
					Register
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						placeholder="Email"
						className={`border-2 border-green-700 py-2 pl-3 rounded-lg ${
							error ? "border-2 border-red-500" : ""
						}`}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<div className="flex flex-col">
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							placeholder="Password"
							className="border-2 border-green-700 py-2 pl-3 rounded-lg"
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && (
							<span className="text-red-500 text-sm mt-1">
								{error}
							</span>
						)}
					</div>

					<button
						type="submit"
						className="bg-white text-black  py-2 mt-2 px-4 rounded-full shadow-md">
						Register
					</button>

					<p className="text-sm text-white text-center">
						Already have an account?{" "}
						<Link to="/login" className="text-green-300">
							Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Register
