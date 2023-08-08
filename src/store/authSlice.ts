import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { LoginFormValues } from '../types/types'
import { cleanData } from './dataSlice'

const initialState = {
    login: null as string | null,
    isAuth: false,
    token: '' as string | null,
    error: null as string | null,
    isPending: false
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
                state.isPending = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isPending = false
                if (action.payload.success && action.payload.getToken) {
                    state.error = null
                    localStorage.setItem('token', action.payload.getToken)
                    state.isAuth = true
                } else {
                    if (action.payload.error === 'Invalid login or password') {
                        state.error = 'Неверный логин или пароль'
                        state.login = null
                    } else {
                        state.error = 'Ошибка, попробуйте снова'
                    }

                }
            })
            .addCase(login.rejected, (state) => {
                state.isPending = false
                state.error = 'Ошибка, попробуйте снова'
            })
    }
})
export const {
    checkToken, logout, setUserName
} = authSlice.actions
export default authSlice.reducer

