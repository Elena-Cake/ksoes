import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'

const initialState = {
    login: 'test',
    isAuth: false,
    token: '' as string | null
}

export const login = createAsyncThunk(
    'auth/login',
    async (formValues: { username: string, password: string }, { rejectWithValue }) => {
        const response = await api.login(formValues)
        return response
    }
)

const authSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        checkToken(state) {
            const token = localStorage.getItem('token');
            if (token) state.isAuth = true
        },
        checkTokenv(state, action: PayloadAction<{ title: string }>) {

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload.getToken) {
                    localStorage.setItem('token', action.payload.getToken)
                    state.isAuth = true
                }
            })
            .addCase(login.rejected, (state) => {
            })
    }
})
export const {
    checkToken
} = authSlice.actions
export default authSlice.reducer

