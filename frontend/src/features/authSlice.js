import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authAPI from "../services/authAPI"

export const LoginUser = createAsyncThunk(
	"auth/login",
	async (user, { rejectWithValue }) => {
		try {
			const response = await authAPI.post("/login", user)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || "login failed")
		}
	}
)

export const RegisterUser = createAsyncThunk(
	"auth/register",
	async (user, { rejectWithValue }) => {
		try {
			const response = await authAPI.post("/register", user)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response?.data || "register failed")
		}
	}
)
export const VerifyUser = createAsyncThunk(
	"auth/verify",
	async (_, { rejectWithValue }) => {
		try {
			const response = await authAPI.get("/me")
			return response.data
		} catch (error) {
			return rejectWithValue(
				error.response?.data || "verification failed"
			)
		}
	}
)

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		loading: false,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.user = null
			state.loading = false
			state.error = null
		},
	},
	extraReducers: (builder) => {
		// Login
		builder
			.addCase(LoginUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(LoginUser.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(LoginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Register
		builder
			.addCase(RegisterUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(RegisterUser.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(RegisterUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Verify
		builder
			.addCase(VerifyUser.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(VerifyUser.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(VerifyUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
				state.user = null
			})
	},
})

export const { logout } = authSlice.actions
export default authSlice.reducer
