import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsAppType, MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsAppType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from '../types/types'
import { setNetworkError } from './appSlice'

const ERROR_NETWORK = 'Проверьте интернет соединение'
const initialState = {
    observatoryDay: [] as ObservatoryRecordsDayType[],
    meansDay: [] as MeansRecordsDayType[]
}

export const getObservatoryByDay = createAsyncThunk(
    'data/observatoryDay',
    async () => {
        const response = await api.getObservatoryByStatDay()
        return response
    }
)
export const getMeansByDay = createAsyncThunk(
    'data/meansDay',
    async () => {
        const response = await api.getMeansByStatDay()
        return response
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // lists
        cleanData(state) {
            state = {
                observatoryDay: [] as ObservatoryRecordsDayType[],
                meansDay: [] as MeansRecordsDayType[]
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // getObservatoryByDay
            .addCase(getObservatoryByDay.pending, (state) => {
            })
            .addCase(getObservatoryByDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatoryDay = action.payload.records
                }
            })
            .addCase(getObservatoryByDay.rejected, (state) => {
                setNetworkError()
            })

            // getMeansByDay
            .addCase(getMeansByDay.pending, (state) => {
            })
            .addCase(getMeansByDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.meansDay = action.payload.records
                }
            })
            .addCase(getMeansByDay.rejected, (state) => {
                setNetworkError()
            })
    }
})
export const {
    cleanData } = dataSlice.actions
export default dataSlice.reducer

