import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/api'
import { MeansRecordsAppType, ObservatoryRecordsType, TypesRecordsType } from '../types/types'

import { useAppDispatch } from './store'
import { apiVocabulary } from '../api/vocabulary'
import { errorTexts } from '../constans/errors'

const initialState = {
    types: [] as TypesRecordsType[],
    observatory: [] as ObservatoryRecordsType[],
    means: [] as MeansRecordsAppType[],
    error: null as string | null
}

export const getTypes = createAsyncThunk(
    'data/types',
    async () => {
        const response = await apiVocabulary.getTypes()
        return response
    }
)
export const getObservatory = createAsyncThunk(
    'data/observatory',
    async () => {
        const response = await apiVocabulary.getObservatory()
        return response
    }
)
export const getMeans = createAsyncThunk(
    'data/means',
    async () => {
        const response = await apiVocabulary.getMeans()
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
                means: [] as MeansRecordsAppType[],
                error: null
            }
        },
        setCatalogs(state) {
            const catalogTypes = localStorage.getItem('catalogTypes') || ''
            state.types = JSON.parse(catalogTypes) || []

            const catalogObservatory = localStorage.getItem('catalogObservatory') || ''
            state.observatory = JSON.parse(catalogObservatory) || []

            const catalogMeans = localStorage.getItem('catalogMeans') || ''
            state.means = JSON.parse(catalogMeans) || []
        },
        removeVocError(state) {
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
                    localStorage.setItem('catalogTypes', JSON.stringify(action.payload.records))
                }
            })
            .addCase(getTypes.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getObservatory
            .addCase(getObservatory.pending, (state) => {

            })
            .addCase(getObservatory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.observatory = action.payload.records
                    localStorage.setItem('catalogObservatory', JSON.stringify(action.payload.records))
                }
            })
            .addCase(getObservatory.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
            // getMeans
            .addCase(getMeans.pending, (state) => {

            })
            .addCase(getMeans.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const id_observatory = Object.keys(action.payload.records)
                    const means = [] as MeansRecordsAppType[]
                    id_observatory.forEach((id) => {
                        // @ts-ignore
                        const id_means = Object.keys(action.payload.records[id])
                        id_means.forEach(id_mean => {
                            means.push({
                                id_observatory: id,
                                id_mean: id_mean,
                                // @ts-ignore
                                name_mean: action.payload.records[id][id_mean]
                            })
                        })
                    })
                    state.means = means
                    localStorage.setItem('catalogMeans', JSON.stringify(means))
                }
            })
            .addCase(getMeans.rejected, (state) => {
                state.error = errorTexts.network.ERROR_NETWORK
            })
    }
})
export const {
    cleanVocabulary, setCatalogs, removeVocError } = vocabularySlice.actions
export default vocabularySlice.reducer

