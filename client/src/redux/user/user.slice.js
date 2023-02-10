import {createSlice} from "@reduxjs/toolkit";
import {fetchAuth, fetchLogin, fetchRegister} from "./user.actions";


const initialState = {
    data: null,
    status: '',
    isLoading: true
}

const userSlice = createSlice({
    name: 'user',
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
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        [fetchLogin.rejected]: (state, action) => {
            state.isLoading = true
        },
        [fetchAuth.pending]: (state) => {
            state.isLoading = true
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state, action) => {
            state.isLoading = true
        },
        [fetchRegister.pending]: (state) => {
            state.isLoading = true
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
        [fetchRegister.rejected]: (state, action) => {
            state.isLoading = true
        }
    }
})

export const selectIsAuth = state => Boolean(state.user.data)
export const selectUserData = state => state.user.data

export const userReducer = userSlice.reducer

export const {logout} = userSlice.actions