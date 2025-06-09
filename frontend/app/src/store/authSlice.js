import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    token: ''
}

export const authThunk = createAsyncThunk('auth/signin', async ({ username, password }) => {
    const body = { username, password };

    const result = await fetch('http://localhost:3000/signin', {
        method: 'POST', 
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const response = await result.json();
    return { token: response.token }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(authThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
        })
    }
});

export default authSlice.reducer;