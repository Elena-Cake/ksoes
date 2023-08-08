import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { LoginFormValues } from '../types/types'
import { cleanData } from './dataSlice'

const initialState = {
    login: null as string | null,
    isAuth: false,
    token: '' as string | null,
    error: null as string | null
}

export const login = createAsyncThunk(
    'auth/login',
    async (formValues: LoginFormValues, { rejectWithValue }) => {
        const response = await api.login(formValues)
        return response
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        checkToken(state) {
            const token = localStorage.getItem('token');
            if (token) state.isAuth = true
        },
        logout(state) {
            state.isAuth = false
            state.login = null
            localStorage.removeItem('token')
            cleanData()
        },
        setUserName(state, action: PayloadAction<{ userName: string }>) {
            state.login = action.payload.userName
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
            })
            .addCase(login.fulfilled, (state, action) => {

                if (action.payload.getToken) {
                    state.error = null
                    localStorage.setItem('token', action.payload.getToken)
                    state.isAuth = true
                } else {
                    if (action.payload.error) {
                        state.error = action.payload.error
                        state.login = null
                    }
                }
            })
            .addCase(login.rejected, (state) => {
            })
    }
})
export const {
    checkToken, logout, setUserName
} = authSlice.actions
export default authSlice.reducer

