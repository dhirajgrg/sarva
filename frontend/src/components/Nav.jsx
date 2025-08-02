import React from "react"
import Button from "./Button"
const menus = ["home", "contact", "about", "service"]

const Nav = () => {
	return (
		<div className="flex justify-between items-center border-b-[1px] border-zinc-200 shadow-zinc-700 shadow-sm py-4 px-10">
			<div className="text-2xl font-bold text-zinc-700">SARVA</div>
			<div className="flex justify-between">
				<div className="flex justify-between items-center ">
					{menus.map((menu, i) => (
						<a className="mr-6 cursor-pointer" key={menu}>
							{menu}
						</a>
					))}
				</div>
				<Button
					btnText="login"
					className="bg-blue-700 rounded-full text-white px-6 py-1 cursor-pointer"
				/>
			</div>
		</div>
	)
}

export default Nav
