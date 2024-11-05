// src/redux/reducers/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        user: null,
    },
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

// Exportez les actions générées par createSlice
export const { setAccessToken, setUser } = authSlice.actions;

// Exportez le réducteur pour l'utiliser dans le store
export default authSlice.reducer;
