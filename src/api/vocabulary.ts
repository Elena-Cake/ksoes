import axios from "axios"
import { MeansRecordsType, ObservatoryRecordsType, TypesRecordsType } from "../types/types"

const getToken = () => `token=${localStorage.getItem('token')}`

const instance = axios.create({
    baseURL: 'https://ares.ksoes.ru/',
    withCredentials: true,
})
const BASE_API = 'api.php?act=upload_files&name=info'

type DataResType<R> = {
    debug: string
    error: string
    message: string
    records: R[]
    success: boolean
}

export const apiVocabulary = {

    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=types
    getTypes() {
        return instance.get<DataResType<TypesRecordsType>>(`${BASE_API}&get=types&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=observatory
    getObservatory() {
        return instance.get<DataResType<ObservatoryRecordsType>>(`${BASE_API}&get=observatory&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=means
    getMeans() {
        return instance.get<DataResType<MeansRecordsType>>(`${BASE_API}&get=means&${getToken()}`)
            .then(res => {
                return res.data
            })
    },

}
