import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchFullPost = createAsyncThunk(
    'posts/fetchFullPost',
    async (id) => {
        try {
            const {data} = await axios.get('/posts/' + id)
            return data
        } catch (err) {
            return err
        }
    })


export const fetchPostComments = createAsyncThunk(
    'fullPost/fetchPostComments',
    async (postId) => {
        try {
            const {data} = await axios.get(`/posts/${postId}/comments`)
            return data
        } catch (e) {
            return e
        }
    })


const initialState = {
    data: [],
    isLoading: true,
}


const fullPostSlice = createSlice({
    name: 'fullPost',
    initialState,
    reducers: {},
    extraReducers: {

        // Get post
        [fetchFullPost.pending]: (state) => {
            state.data = []
            state.isLoading = true
        },
        [fetchFullPost.fulfilled]: (state, action) => {
            state.data = action.payload
            state.isLoading = false
        },
        [fetchFullPost.rejected]: (state) => {
            state.data = []
            state.isLoading = true
        },

        // Get post comments
        [fetchPostComments.pending]: (state) => {
            state.data.comments = []
            state.isLoading = true
        },
        [fetchPostComments.fulfilled]: (state, action) => {
            state.data.comments = action.payload
            state.isLoading = false
        },
        [fetchPostComments.rejected]: (state) => {
            state.data.comments = []
            state.isLoading = true
        },

    }
})

export default fullPostSlice.reducer