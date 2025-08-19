import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	posts: [],
	status: "idle",
	error: null,
}

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPost: (state, action) => {
			state.posts = action.payload
		},
		addPost: (state, action) => {
			state.posts.push(action.payload)
		},
	},
})

export const { setPost, addPost } = postSlice.actions
export default postSlice.reducer
