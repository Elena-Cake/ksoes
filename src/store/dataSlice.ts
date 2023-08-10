import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsDayType, ObservatoryRecordsDayType, dateFormValues } from '../types/types'
import { setNetworkError } from './appSlice'
import { errorTexts } from '../constans/errors'


const initialState = {
    observatoryDay: [] as ObservatoryRecordsDayType[],
    meansDay: [] as MeansRecordsDayType[],
    error: null as string | null,
    isStatReportObservatoryUpdate: true,
    isStatReportMeansUpdate: true
}

export const getObservatoryByStatDay = createAsyncThunk(
    'data/observatoryStatDay',
    async () => {
        const response = await api.getObservatoryByStatDay()
        return response
    }
)
export const getObservatoryByDay = createAsyncThunk(
    'data/observatoryDay',
    async (formValues: dateFormValues, { rejectWithValue }) => {
        const response = await api.getObservatoryByDay(formValues)
        return response
    }
)
export const getObservatoryByDays = createAsyncThunk(
    'data/observatoryDays',
    async (formValues: dateFormValues, { rejectWithValue }) => {
        const response = await api.getObservatoryByDays(formValues)
        return response
    }
)
export const getMeansByStatDay = createAsyncThunk(
    'data/meansStatDay',
    async () => {
        const response = await api.getMeansByStatDay()
        return response
    }
)
export const getMeansByDay = createAsyncThunk(
    'data/meansDay',
    async (formValues: dateFormValues, { rejectWithValue }) => {
        const response = await api.getMeansByDay(formValues)
        return response
    }
)
export const getMeansByDays = createAsyncThunk(
    'data/meansDays',
    async (formValues: dateFormValues, { rejectWithValue }) => {
        const response = await api.getMeansByDays(formValues)
        return response
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // lists
        cleanData(state) {
            state = initialState
        },
        removeDataError(state) {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // getObservatoryByStatDay
            .addCase(getObservatoryByStatDay.pending, (state) => {
            })
            .addCase(getObservatoryByStatDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isStatReportObservatoryUpdate = true
                    state.observatoryDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getObservatoryByStatDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getObservatoryByDay
            .addCase(getObservatoryByDay.pending, (state) => {

            })
            .addCase(getObservatoryByDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isStatReportObservatoryUpdate = false
                    state.observatoryDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getObservatoryByDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getObservatoryByDays
            .addCase(getObservatoryByDays.pending, (state) => {
            })
            .addCase(getObservatoryByDays.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isStatReportObservatoryUpdate = false
                    state.observatoryDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getObservatoryByDays.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })


            // getMeansByStatDay
            .addCase(getMeansByStatDay.pending, (state) => {
            })
            .addCase(getMeansByStatDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isStatReportMeansUpdate = true
                    // state.meansDay = action.payload.records
                    state.meansDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getMeansByStatDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getMeansByDay
            .addCase(getMeansByDay.pending, (state) => {
            })
            .addCase(getMeansByDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isStatReportMeansUpdate = false
                    state.meansDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getMeansByDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getMeansByDays
            .addCase(getMeansByDays.pending, (state) => {
            })
            .addCase(getMeansByDays.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isStatReportMeansUpdate = false
                    state.meansDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getMeansByDays.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
    }
})
export const {
    cleanData, removeDataError } = dataSlice.actions
export default dataSlice.reducer

