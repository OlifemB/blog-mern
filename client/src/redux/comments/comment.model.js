import {createSlice} from "@reduxjs/toolkit";

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchLastComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        try {
            const {data} = await axios.get('/comments')
            return data
        } catch (e) {
            return e
        }
    })


const initialState = {
    items: [],
    isLoading: true,
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLastComments.pending]: (state) => {
            state.items = []
            state.isLoading = true
        },
        [fetchLastComments.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [fetchLastComments.rejected]: (state, action) => {
            state.items = action.payload
            state.isLoading = true
        },
    }
})

export default commentsSlice.reducer