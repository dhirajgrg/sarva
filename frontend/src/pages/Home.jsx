import React from "react"
import Nav from "../components/Nav"
import Hero from "../components/Hero"
import CardsContainer from "../components/CardsContainer"

const Home = () => {
	return (
		<div className="h-full w-full overflow-hidden">
			<Nav />
			<Hero />
			<CardsContainer/>
		</div>
	)
}

export default Home
