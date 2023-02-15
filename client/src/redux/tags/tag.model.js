//Get tags
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../utils/axios";


export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
    const {data} = await axios.get('/tags')
    return data
})

const initialState = {
    items: [],
    isLoading: true,
}


const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTags.pending]: (state) => {
            state.items = []
            state.isLoading = true
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = false
        },
        [fetchTags.rejected]: (state) => {
            state.items = []
            state.isLoading = true
        },
    }
})


export default tagsSlice.reducer