import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsAppType, MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsAppType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from '../types/types'
import { removeError, setNetworkError } from './appSlice'

const initialState = {
    types: [] as TypesRecordsType[],
    observatory: [] as ObservatoryRecordsType[],
    means: [] as MeansRecordsAppType[]
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

const vocabularySlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // lists
        cleanVocabulary(state) {
            state = {
                types: [] as TypesRecordsType[],
                observatory: [] as ObservatoryRecordsType[],
                means: [] as MeansRecordsAppType[]
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // getTypes
            .addCase(getTypes.pending, (state) => {
                removeError()
            })
            .addCase(getTypes.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.types = action.payload.records
                }
            })
            .addCase(getTypes.rejected, (state) => {
                setNetworkError()
            })
            // getObservatory
            .addCase(getObservatory.pending, (state) => {
                removeError()
            })
            .addCase(getObservatory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatory = action.payload.records
                }
            })
            .addCase(getObservatory.rejected, (state) => {
                setNetworkError()
            })
            // getMeans
            .addCase(getMeans.pending, (state) => {
                removeError()
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
                setNetworkError()
            })
    }
})
export const {
    cleanVocabulary } = vocabularySlice.actions
export default vocabularySlice.reducer

