import React, { Children, useEffect, useState } from "react"
import { authAPI } from "../services/authAPI"
import { Navigate } from "react-router-dom"

function ProtectedRoutes({ children }) {
	const [isAuth, setIsAuth] = useState(null)
	useEffect(() => {
		const verifyToken = async () => {
			try {
				await authAPI.get("/api/verify")
				setIsAuth(true)
			} catch (error) {
				setIsAuth(false)
                console.log(error)
			}
		}
		verifyToken()
	}, [])
	if (isAuth === null) return <p>Loading...</p>
	if (!isAuth) return <Navigate to="/login" replace />
	return children
}

export default ProtectedRoutes
