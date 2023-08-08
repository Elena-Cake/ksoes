import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsAppType, MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsAppType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from '../types/types'

const ERROR_NETWORK = 'Проверьте интернет соединение'
const initialState = {
    types: [] as TypesRecordsType[],
    observatory: [] as ObservatoryRecordsType[],
    observatoryDay: [] as ObservatoryRecordsDayType[],
    // means: [] as MeansRecordsAppType[]
    means: [] as MeansRecordsAppType[],
    meansDay: [] as MeansRecordsDayType[],
    isPending: false,
    error: null as string | null
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
        const response = await api.getObservatoryByStatDay()
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
                types: [] as TypesRecordsType[],
                observatory: [] as ObservatoryRecordsType[],
                observatoryDay: [] as ObservatoryRecordsDayType[],
                means: [] as MeansRecordsAppType[],
                meansDay: [] as MeansRecordsDayType[],
                isPending: false,
                error: null
            }
        },
        setIsPendingOn(state) {
            state.isPending = true
        },
        setIsPendingOff(state) {
            state.isPending = false
        },
        removeError(state) {
            state.error = null
        }
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
                state.error = ERROR_NETWORK
            })
            // getObservatory
            .addCase(getObservatory.pending, (state) => {
            })
            .addCase(getObservatory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatory = action.payload.records
                    // const keys = Object.keys(action.payload.records)
                    // keys.forEach((key: string) => {
                    //     // @ts-ignore
                    //     state.observatory.push({ code: key, name: action.payload.records[key] })
                    // })
                }
            })
            .addCase(getObservatory.rejected, (state) => {
                state.error = ERROR_NETWORK
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
                state.error = ERROR_NETWORK
            })
            // getMeans
            .addCase(getMeans.pending, (state) => {
            })
            .addCase(getMeans.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const id_observatory = Object.keys(action.payload.records)
                    const means = [] as MeansRecordsAppType[]
                    id_observatory.map((id) => {
                        // @ts-ignore
                        const id_means = Object.keys(action.payload.records[id])
                        id_means.map(id_mean => {
                            means.push({
                                id_observatory: id,
                                id_mean: id_mean,
                                // @ts-ignore
                                name_mean: action.payload.records[id][id_mean]
                            })
                        })
                    })
                    state.means = means
                }
            })
            .addCase(getMeans.rejected, (state) => {
                state.error = ERROR_NETWORK
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
                state.error = ERROR_NETWORK
            })
    }
})
export const {
    cleanData,
    setIsPendingOn,
    setIsPendingOff,
    removeError } = dataSlice.actions
export default dataSlice.reducer

