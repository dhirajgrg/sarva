import axios from "axios"

const mainAPI = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})
export default mainAPI
