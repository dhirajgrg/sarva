import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { VerifyUser } from "../features/authSlice"

function ProtectedRoutes({ children }) {
	const dispatch = useDispatch()
	const { user, loading } = useSelector((state) => state.auth)

	useEffect(() => {
		if (user === null && !loading) {
			dispatch(VerifyUser())
		}
	}, [dispatch, user, loading])

	if (loading) return <p>Loading...</p>

	if (!user) return <Navigate to="/login" replace />

	return children
}

export default ProtectedRoutes
