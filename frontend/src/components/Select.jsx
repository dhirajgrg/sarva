import React from "react"

const Select = ({ optionData=[],className='',optionClassName='' }) => {
	return (
		<div className={`${className}`}>
			<select name="" id="">
				{optionData.map((option, i) => (
					<option
                    className={`${optionClassName}`}
                    key={i}>{option}</option>
				))}
			</select>
		</div>
	)
}

export default Select
