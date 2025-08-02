import React from 'react'

const Button = ({btnText='',className=''}) => {
  return (
    <div
    className={`${className}`}
    >{btnText}</div>
  )
}

export default Button