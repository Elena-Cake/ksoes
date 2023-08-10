import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { LoginFormValues } from '../types/types'
import { cleanData } from './dataSlice'
import { cleanVocabulary } from './vocabularySlice'
import { setIsPendingOff, setIsPendingOn } from './appSlice'
import { apiAuth } from '../api/auth'
import { errorTexts } from '../constans/errors'
import { succsessTexts } from '../constans/succsess'

const initialState = {
    login: null as string | null,
    isAuth: false,
    token: '' as string | null,
    error: null as string | null,
    succsess: null as string | null,
}

export const login = createAsyncThunk(
    'auth/login',
    async (formValues: LoginFormValues, { rejectWithValue }) => {
        const response = await apiAuth.login(formValues)
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
            state = initialState
            localStorage.removeItem('token')
            localStorage.clear()
        },
        setUserName(state, action: PayloadAction<{ userName: string }>) {
            state.login = action.payload.userName
        },
        removeSuccsessMessageAuth(state) {
            state.succsess = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {

            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.success && action.payload.getToken) {
                    state.error = null
                    localStorage.setItem('token', action.payload.getToken)
                    state.isAuth = true
                    state.succsess = succsessTexts.OK
                } else {
                    if (action.payload.error === 'Invalid login or password') {
                        state.error = errorTexts.auth.ERROR_AUTHORISATION
                        state.login = null
                    } else {
                        state.error = errorTexts.auth.ERROR
                    }

                }
            })
            .addCase(login.rejected, (state) => {
                state.error = errorTexts.auth.ERROR
            })
    }
})
export const {
    checkToken, logout, setUserName, removeSuccsessMessageAuth
} = authSlice.actions
export default authSlice.reducer

