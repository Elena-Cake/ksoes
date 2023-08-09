import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsDayType, ObservatoryRecordsDayType, dateFormValues } from '../types/types'
import { setNetworkError } from './appSlice'

const initialState = {
    observatoryDay: [] as ObservatoryRecordsDayType[],
    meansDay: [] as MeansRecordsDayType[],
    error: null as string | null
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
            state = {
                observatoryDay: [] as ObservatoryRecordsDayType[],
                meansDay: [] as MeansRecordsDayType[],
                error: null
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // getObservatoryByStatDay
            .addCase(getObservatoryByStatDay.pending, (state) => {
            })
            .addCase(getObservatoryByStatDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatoryDay = action.payload.records
                }
            })
            .addCase(getObservatoryByStatDay.rejected, (state) => {
                setNetworkError()
            })
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
            // getObservatoryByDays
            .addCase(getObservatoryByDays.pending, (state) => {
            })
            .addCase(getObservatoryByDays.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatoryDay = action.payload.records
                }
            })
            .addCase(getObservatoryByDays.rejected, (state) => {
                setNetworkError()
            })


            // getMeansByStatDay
            .addCase(getMeansByStatDay.pending, (state) => {
            })
            .addCase(getMeansByStatDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.meansDay = action.payload.records
                }
            })
            .addCase(getMeansByStatDay.rejected, (state) => {
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
            // getMeansByDays
            .addCase(getMeansByDays.pending, (state) => {
            })
            .addCase(getMeansByDays.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.meansDay = action.payload.records
                }
            })
            .addCase(getMeansByDays.rejected, (state) => {
                setNetworkError()
            })
    }
})
export const {
    cleanData } = dataSlice.actions
export default dataSlice.reducer

