import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsAppType, MeansRecordsType, ObservatoryRecordsAppType, ObservatoryRecordsType, TypesRecordsType } from '../types/types'

const initialState = {
    types: [] as TypesRecordsType[],
    observatory: [] as ObservatoryRecordsAppType[],
    // means: [] as MeansRecordsAppType[]
    means: [] as MeansRecordsType[]
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
export const getMeans = createAsyncThunk(
    'data/means',
    async () => {
        const response = await api.getMeans()
        return response
    }
)

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // lists
        addTodoList(state, action: PayloadAction<{ title: string }>) {

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
            // getMeans
            .addCase(getMeans.pending, (state) => {
            })
            .addCase(getMeans.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.means = action.payload.records
                    // const keys = Object.keys(action.payload.records)

                    // keys.forEach((key) => {
                    //     // @ts-ignore
                    //     const keysInstruments = Object.keys(action.payload.records[key])
                    //     keysInstruments.forEach((instrument) => {
                    //         state.means.push({
                    //             code: key,
                    //             codeInstrument: instrument,
                    //             // @ts-ignore
                    //             name: action.payload.records[key][instrument]
                    //         })
                    //     })
                    // })
                }
            })
            .addCase(getMeans.rejected, (state) => {
            })
    }
})
export const {
} = dataSlice.actions
export default dataSlice.reducer

