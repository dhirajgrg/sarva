import React from "react"
import Select from "./Select"
import Button from "./Button"
import { cities,categories } from "../Data/Data"

const Hero = () => {
	return (
		<div className="bg-green-900 py-20 flex justify-center items-center flex-col ">
			<div className="bg-white text-black rounded-full   flex items-center px-10 py-2 justify-center mb-20   ">
				<input
					className=" bg-white
         px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
					type="text"
					placeholder="what are you looking for ?"
				/>
				<Select
					optionData={Object.keys(categories)}
					className="px-2 flex items-center justify-center border-r-[2px] border-zinc-400 "
					optionClassName="text-center  "
				/>
				<Select
					optionData={cities}
					className="px-4 flex items-center justify-center  "
					optionClassName="text-center"
				/>
				<Button
					btnText="search"
					className="px-6 py-1 bg-blue-700 text-white rounded-full cursor-pointer"
				/>
			</div>
			<div className="flex justify-center items-center gap-4 flex-wrap px-20 pt-10">
				{Object.keys(categories).map((category) => {
					return (
						<div key={category} className="cursor-pointer">
							<span className="px-4 py-1 rounded-md bg-zinc-100">
								{category}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Hero
