import axios from "axios"

const authAPI = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})
export default authAPI
