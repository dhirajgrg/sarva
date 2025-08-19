import React from "react"

const Button = ({ btnText = "", className = "", onClick }) => {
	return (
		<button className={`${className}`} onClick={onClick}>
			{btnText}
		</button>
	)
}

export default Button
