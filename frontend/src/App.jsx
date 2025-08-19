import React from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppRoute from "../src/routes/AppRoute.jsx"

const App = () => {
	return (
		<div>
			<AppRoute />
			<ToastContainer
				toastClassName={(context) =>
					context?.type === "success"
						? "bg-green-800 text-white rounded-lg shadow-lg flex items-center px-8 py-4"
						: context?.type === "error"
						? "bg-red-700 text-white rounded-lg shadow-lg flex items-center px-8 py-4"
						: context?.type === "info"
						? "bg-blue-700 text-white rounded-lg shadow-lg flex items-center px-8 py-4"
						: "bg-yellow-600 text-white rounded-lg shadow-lg flex items-center px-8 py-4"
				}
				bodyClassName="flex items-center space-x-2 text-sm font-medium"
				position="top-center"
				autoClose={3000}
				closeOnClick
				pauseOnHover
				draggable
			/>
		</div>
	)
}

export default App
