import React from "react"
import { Button } from "antd"
import { LoginOutlined } from "@ant-design/icons"

const LoginBtn = ({ btnText }) => {
	return (
		<Button type="primary" icon={<LoginOutlined />} shape="round">
			{btnText}
		</Button>
	)
}

export default LoginBtn
