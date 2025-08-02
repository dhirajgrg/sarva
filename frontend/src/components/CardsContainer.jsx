import React from "react"
import Card from "./Card"
import { categories } from "../Data/Data"

const CardsContainer = () => {
	return (
		<div className="bg-zinc-100  py-20 px-4 sm:px-10">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{Object.entries(categories).map(
					([category, subcategory], index) => (
						<Card
							key={index}
							category={category}
							subcategory={subcategory}
						/>
					)
				)}
			</div>
		</div>
	)
}
export default CardsContainer
