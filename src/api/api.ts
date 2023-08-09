import axios from "axios"
import { MeansRecordsDayType, ObservatoryRecordsDayType, dateFormValues } from "../types/types"

const getToken = () => `token=${localStorage.getItem('token')}`

const instance = axios.create({
    baseURL: 'https://ares.ksoes.ru/',
    withCredentials: true,
})
const BASE_API = 'api.php?name=group&act=upload_files&get=stat_day'


type DataResType<R> = {
    debug: string
    error: string
    message: string
    records: R[]
    success: boolean
}

export const api = {

    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=observatory
    getObservatoryByStatDay() {
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API}&group=observatory&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?name=group&act=upload_files&get=stat_day&group=observatory&date_end=2023-08-01&date_start=2023-07-29
    getObservatoryByDay(formValues: dateFormValues) {
        const { date_start } = formValues
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API}&group=observatory&date_end=${date_start}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    getObservatoryByDays(formValues: dateFormValues) {
        const { date_start, date_end } = formValues
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API}&group=observatory&date_start=${date_start}&date_end=${date_end}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },

    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=mean
    getMeansByStatDay() {
        return instance.get<DataResType<MeansRecordsDayType>>(`${BASE_API}&group=mean&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?name=group&act=upload_files&get=stat_day&group=mean&date_end=2023-08-01&date_start=2023-07-29
    getMeansByDay(formValues: dateFormValues) {
        const { date_start } = formValues
        return instance.get<DataResType<MeansRecordsDayType>>(`${BASE_API}&group=mean&date_end=${date_start}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    getMeansByDays(formValues: dateFormValues) {
        const { date_start, date_end } = formValues
        return instance.get<DataResType<MeansRecordsDayType>>(`${BASE_API}&group=mean&date_start=${date_start}&date_end=${date_end}&${getToken()}`)
            .then(res => {
                return res.data
            })
    }


}
