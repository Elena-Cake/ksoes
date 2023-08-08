import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsAppType, ObservatoryRecordsDayType, TypesRecordsType } from '../types/types'

const initialState = {
    types: [] as TypesRecordsType[],
    observatory: [] as ObservatoryRecordsAppType[],
    observatoryDay: [] as ObservatoryRecordsDayType[],
    // means: [] as MeansRecordsAppType[]
    means: [] as MeansRecordsType[],
    meansDay: [] as MeansRecordsDayType[]
}

export const getTypes = createAsyncThunk(
    'data/types',
    async () => {
        const response = await api.getTypes()
        return response
    }
)
export const getObservatory = createAsyncThunk(
    'data/observatory',
    async () => {
        const response = await api.getObservatory()
        return response
    }
)
export const getObservatoryByDay = createAsyncThunk(
    'data/observatoryDay',
    async () => {
        const response = await api.getObservatoryByDay()
        return response
    }
)
export const getMeans = createAsyncThunk(
    'data/means',
    async () => {
        const response = await api.getMeans()
        return response
    }
)
export const getMeansByDay = createAsyncThunk(
    'data/meansDay',
    async () => {
        const response = await api.getMeansByDay()
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
                types: [] as TypesRecordsType[],
                observatory: [] as ObservatoryRecordsAppType[],
                observatoryDay: [] as ObservatoryRecordsDayType[],
                means: [] as MeansRecordsType[],
                meansDay: [] as MeansRecordsDayType[]
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // getTypes
            .addCase(getTypes.pending, (state) => {
            })
            .addCase(getTypes.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.types = action.payload.records
                }
            })
            .addCase(getTypes.rejected, (state) => {
            })
            // getObservatory
            .addCase(getObservatory.pending, (state) => {
            })
            .addCase(getObservatory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const keys = Object.keys(action.payload.records)
                    keys.forEach((key: string) => {
                        // @ts-ignore
                        state.observatory.push({ code: key, name: action.payload.records[key] })
                    })
                }
            })
            .addCase(getObservatory.rejected, (state) => {
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
            })
            // getMeans
            .addCase(getMeans.pending, (state) => {
            })
            .addCase(getMeans.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.means = action.payload.records
                }
            })
            .addCase(getMeans.rejected, (state) => {
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
            })
    }
})
export const { cleanData } = dataSlice.actions
export default dataSlice.reducer

