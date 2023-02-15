import {createSlice} from "@reduxjs/toolkit";

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "src/utils/axios";


export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        try {
            const {data} = await axios.get('/posts')
            return data
        } catch (e) {
            return e
        }
    })

export const removePost = createAsyncThunk(
    'posts/delete',
    async (id) => {
        try {
            axios.delete('/posts/' + id)
        } catch (e) {
            return e
        }
    })

export const addComment = createAsyncThunk(
    'posts/addComment',
    async (fields) => {
        try {
            const {data} = await axios.post(`/comments`, fields)
            return data
        } catch (e) {
            return e
        }
    }
)

export const removeComment = createAsyncThunk(
    'posts/removeComment',
    async (id) => {
        try {
            const {data} = await axios.delete(`/comments/${id}`)
            return data
        } catch (e) {
            return e
        }
    }
)

export const updateComment = createAsyncThunk(
    'posts/removeComment',
    async (id) => {
        try {
            const {data} = await axios.delete(`/comments/${id}`)
            return data
        } catch (e) {
            return e
        }
    }
)

export const fetchPostComments = createAsyncThunk(
    'posts/fetchPostComments',
    async (postId) => {
        try {
            const {data} = await axios.get(`/posts/${postId}/comments`)
            return data
        } catch (e) {
            return e
        }
    })


const initialState = {
    items: [],
    fullPost: {},
    isLoading: true,
    isFullPostLoading: true
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {

        // Get posts
        [fetchPosts.pending]: (state) => {
            state.items = []
            state.isLoading = true
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [fetchPosts.rejected]: (state) => {
            state.items = []
            state.isLoading = true
        },


        // Get full posts
        [fetchPostComments.pending]: (state) => {
            state.fullPost.comments = []
            state.isLoading = true
        },
        [fetchPostComments.fulfilled]: (state, action) => {
            state.fullPost.comments = action.payload
            state.isLoading = false
        },
        [fetchPostComments.rejected]: (state) => {
            state.fullPost.comments = []
            state.isLoading = true
        },

        [addComment.fulfilled]: (state, action) => {
            state.fullPost.comments = [...state.fullPost.comments, action.payload]
        },


        //Remove posts
        [removePost.pending]: (state, action) => {
            state.items = state.items.filter(post => post._id !== action.meta.arg)
        },
    }
})

export default postsSlice.reducer