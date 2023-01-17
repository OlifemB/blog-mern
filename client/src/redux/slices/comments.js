import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const {data} = await axios.get('/comments')
    return data
})

const initialState = {
    items: [],
    isLoading: true,
    status: ''
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.items = []
            state.status = 'loading'
            state.isLoading = true
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'loaded'
            state.isLoading = false
        },
        [fetchComments.rejected]: (state, action) => {
            state.items = action.payload
            state.status = 'error'
            state.isLoading = true
        }
    }
})

export const commentsReducer = commentsSlice.reducer