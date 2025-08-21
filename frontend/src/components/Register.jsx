import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { RegisterUser } from "../features/authSlice"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { loading } = useSelector((state) => state.auth)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("")

		try {
			// Dispatch the async thunk and wait for completion
			const resultAction = await dispatch(
				RegisterUser({ email, password })
			)

			if (RegisterUser.fulfilled.match(resultAction)) {
				toast.success("User registered successfully!")
				navigate("/login")
			} else {
				// If rejected, show error message
				setError(resultAction.payload?.message || "Registration failed")
			}
		} catch (err) {
			setError("Something went wrong")
		}
	}

	const goBack = () => {
		navigate("/")
	}

	return (
		<div className="flex justify-center items-center h-screen bg-white px-6 md:px-0">
			<div className="bg-green-800 relative text-white shadow-md rounded-lg p-6 w-full max-w-sm">
				<div
					className="absolute top-1 left-3 text-3xl w-10 text-center cursor-pointer"
					onClick={goBack}>
					&larr;
				</div>
				<h1 className="text-2xl font-bold text-center mb-6">
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
							error ? "border-red-500" : ""
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
						disabled={loading}
						className="bg-white text-black py-2 mt-2 px-4 rounded-full shadow-md disabled:opacity-50">
						{loading ? "Registering..." : "Register"}
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
