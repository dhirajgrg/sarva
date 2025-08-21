import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { LoginUser } from "../features/authSlice"
const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user } = useSelector((state) => state.auth)

	const goBack = () => {
		navigate("/")
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError("") // reset previous error

		try {
			// Dispatch the async thunk and wait for completion
			const resultAction = await dispatch(LoginUser({ email, password }))

			if (LoginUser.fulfilled.match(resultAction)) {
				toast.success("User logged in successfully!")
				navigate("/")
			} else {
				// If rejected, show error message
				setError(resultAction.payload?.message || "Login failed")
			}
		} catch (err) {
			if (err.response && err.response.data) {
				setError(err.response.data.message)
			} else {
				setError("Something went wrong")
			}
		}
	}

	return (
		<div className="flex justify-center items-center h-screen bg-white px-6 md:px-0">
			<div className="bg-green-800 relative text-white shadow-md rounded-lg p-6 w-full max-w-sm">
				<div
					className=" absolute top-1 left-3 text-3xl w-10 text-center cursor-pointer "
					onClick={goBack}>
					&larr;{" "}
				</div>
				<h1 className="text-2xl font-bold mb-6 text-center ">Login</h1>
				<form onSubmit={handleSubmit} autoComplete="off" className="flex flex-col gap-4">
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						placeholder="Email"
						className={`border-2 border-green-700 py-2 pl-3  rounded-lg ${
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
						className="bg-white text-black   py-2 mt-2  px-4 rounded-full cursor-pointer">
						Login
					</button>

					<p className="text-sm text-white text-center">
						Don't have an account?{" "}
						<Link to="/register" className="text-green-300">
							Register
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}

export default Login
