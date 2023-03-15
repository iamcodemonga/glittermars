import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    error: false,
    loading: true
}

export const fetchUser = createAsyncThunk('auth/user', async() => {
    const userid = JSON.parse(localStorage.getItem('id'));
    console.log(userid)
    if (!userid) {
        return null;
    }

    try {
        const { data } = await axios(`http://localhost:3005/user/${userid}`, { withCredentials: true });
        return data;
    } catch (error) {
        console.log(error);
    }
})

export const registerUser = createAsyncThunk('auth/register', async(userInfo) => {
    localStorage.setItem('id', JSON.stringify(userInfo._id));
    return userInfo;
})

export const loginUser = createAsyncThunk('auth/login', async(userInfo) => {
    localStorage.setItem('id', JSON.stringify(userInfo._id));
    return userInfo;
})

export const logoutUser = createAsyncThunk('auth/logout', async() => {
    localStorage.removeItem('id');
    return null;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
            .addCase(registerUser.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.error = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.loading = true
                state.error = false
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.user = null;
                state.loading = false
                state.error = false
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false
                state.error = true
            })
        }
})

export default authSlice.reducer;