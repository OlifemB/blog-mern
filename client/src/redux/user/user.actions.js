import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (params) => {
    const {data} = await axios.post('/users/login', params)
    fetchAuth()
    return data
})

export const fetchRegister = createAsyncThunk('user/fetchRegister', async (params) => {
    const {data} = await axios.post('/users/register', params)
    return data
})

export const fetchAuth = createAsyncThunk('user/fetchAuth', async () => {
    const {data} = await axios.get('/users/auth')
    return data
})