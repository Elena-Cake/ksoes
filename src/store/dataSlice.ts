import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsDayType, ObservatoryRecordsDayType, dateFormValues } from '../types/types'
import { errorTexts } from '../constans/errors'
import { succsessTexts } from '../constans/succsess'
import { getDataWithDots } from '../utils/functions'


const initialState = {
    observatoryDay: [] as ObservatoryRecordsDayType[],
    observatoryReportSender: [] as ObservatoryRecordsDayType[],
    meansDay: [] as MeansRecordsDayType[],
    isStatReportObservatoryUpdate: true,
    error: null as string | null,
    succsess: null as string | null,
    dateReport: null as string | null
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


export const getObservatoryByStatDaySender = createAsyncThunk(
    'data/observatoryStatDaySender',
    async () => {
        const response = await api.getObservatoryByStatDaySender()
        return response
    }
)
export const getObservatoryByDaySender = createAsyncThunk(
    'data/observatoryDaySender',
    async (formValues: dateFormValues, { rejectWithValue }) => {
        const response = await api.getObservatoryByDaySender(formValues)
        return response
    }
)
export const getObservatoryByDaysSender = createAsyncThunk(
    'data/observatoryDaysSender',
    async (formValues: dateFormValues, { rejectWithValue }) => {
        const response = await api.getObservatoryByDaysSender(formValues)
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
        },
        removeSuccsessMessageData(state) {
            state.succsess = null
        }
    },
    extraReducers: (builder) => {
        builder
            // getObservatoryByStatDay
            .addCase(getObservatoryByStatDay.pending, (state) => {
            })
            .addCase(getObservatoryByStatDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.succsess = succsessTexts.UPDATED
                    state.isStatReportObservatoryUpdate = true
                    state.observatoryDay = action.payload.records.filter(item => item.count !== 0)
                    const today = new Date()
                    state.dateReport = today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear()
                }
            })
            .addCase(getObservatoryByStatDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getObservatoryByDay
            .addCase(getObservatoryByDay.pending, (state) => {

            })
            .addCase(getObservatoryByDay.fulfilled, (state, action) => {
                if (action.payload.data.success) {
                    state.succsess = succsessTexts.OK
                    state.isStatReportObservatoryUpdate = false
                    state.observatoryDay = action.payload.data.records.filter(item => item.count !== 0)
                    state.dateReport = getDataWithDots(action.payload.date)
                }
            })
            .addCase(getObservatoryByDay.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getObservatoryByDays
            .addCase(getObservatoryByDays.pending, (state) => {
            })
            .addCase(getObservatoryByDays.fulfilled, (state, action) => {
                if (action.payload.data.success) {
                    state.succsess = succsessTexts.OK
                    state.isStatReportObservatoryUpdate = false
                    state.observatoryDay = action.payload.data.records.filter(item => item.count !== 0)
                    // @ts-ignore
                    state.dateReport = getDataWithDots(action.payload.date_start) + ' - ' + getDataWithDots(action.payload.date_end)
                }
            })
            .addCase(getObservatoryByDays.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })

            // Sender
            // getObservatoryByStatDaySender
            .addCase(getObservatoryByStatDaySender.pending, (state) => {
            })
            .addCase(getObservatoryByStatDaySender.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatoryReportSender = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getObservatoryByStatDaySender.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getObservatoryByDaySender
            .addCase(getObservatoryByDaySender.pending, (state) => {

            })
            .addCase(getObservatoryByDaySender.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatoryReportSender = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getObservatoryByDaySender.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getObservatoryByDaysSender
            .addCase(getObservatoryByDaysSender.pending, (state) => {
            })
            .addCase(getObservatoryByDaysSender.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatoryReportSender = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getObservatoryByDaysSender.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })


            // getMeansByStatDay
            .addCase(getMeansByStatDay.pending, (state) => {
            })
            .addCase(getMeansByStatDay.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.succsess = succsessTexts.UPDATED
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
                    state.succsess = succsessTexts.OK
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
                    state.succsess = succsessTexts.OK
                    state.meansDay = action.payload.records.filter(item => item.count !== 0)
                }
            })
            .addCase(getMeansByDays.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
    }
})
export const {
    cleanData, removeDataError, removeSuccsessMessageData
} = dataSlice.actions
export default dataSlice.reducer

