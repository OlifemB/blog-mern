import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const {data} = await axios.post('/users/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/users/register',params)
    return data
})

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async () => {
    const {data} = await axios.get('/users/auth')
    return data
})

const initialState = {
    data: null,
    status: '',
    isLoading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.isLoading = true
            state.data = null
            state.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchLogin.rejected]: (state, action) => {
            state.isLoading = true
            state.status = 'error: ' + action.payload
        },
        [fetchAuth.pending]: (state) => {
            state.isLoading = true
            state.data = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchAuth.rejected]: (state, action) => {
            state.isLoading = true
            state.status = 'error: ' + action.payload
        },
        [fetchRegister.pending]: (state) => {
            state.isLoading = true
            state.data = null
            state.status = 'loading'
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchRegister.rejected]: (state, action) => {
            state.isLoading = true
            state.status = 'error: ' + action.payload
        }
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions