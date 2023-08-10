import { createSlice } from '@reduxjs/toolkit'
import { errorTexts } from '../constans/errors'

const initialState = {
    isPending: false,
    error: null as string | null
}


const appSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setIsPendingOn(state) {
            state.isPending = true
        },
        setIsPendingOff(state) {
            state.isPending = false
        },
        setNetworkError(state) {
            state.error = errorTexts.network.ERROR_NETWORK
        },
        removeError(state) {
            state.error = null
        }
    }
})
export const {
    setIsPendingOn,
    setIsPendingOff,
    setNetworkError,
    removeError } = appSlice.actions
export default appSlice.reducer

