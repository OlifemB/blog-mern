import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from '../../axios'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/delete', async (id) => {
    axios.delete('/posts/' + id)
})


const initialState = {
    posts: {
        items: [],
        isLoading: true,
        status: ''
    },
    tags: {
        items: [],
        isLoading: true,
        status: ''
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        // Get posts
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.isLoading = true
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.isLoading = false
            state.tags.status = 'loaded'
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.isLoading = true
            state.posts.status = 'error: ' + action.payload
        },
        //Get tags
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.isLoading = true
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.isLoading = false
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.isError = true
            state.tags.status = 'error: ' + action.payload
        },
        //Remove post
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(post => post._id !== action.meta.arg)
        },
        [fetchRemovePost.rejected]: (state, action) => {
            state.posts.status = 'error: ' + action.payload
        },
    }
})

export const postsReducer = postsSlice.reducer