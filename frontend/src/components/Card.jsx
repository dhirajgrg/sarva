import React from "react"

const Card = ({ category, subcategory }) => {
	return (
		<div className="bg-white rounded-lg flex flex-col p-2 h-auto shadow-md ">
			<div className="bg-zinc-400 h-40 rounded-lg w-full">
				<img
					src=""
					alt=""
					className="w-full h-full object-cover rounded-lg"
				/>
			</div>
			<div className="mt-2 text-sm">
				<p className="font-semibold">$3000</p>
				<p className="text-gray-700">Room rent</p>
				<p className="text-gray-600 text-xs">Short description...</p>
			</div>
		</div>
	)
}

export default Card
