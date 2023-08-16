import axios from "axios"
import { MeansRecordsDayType, ObservatoryRecordsDayType, dateFormValues } from "../types/types"

const getToken = () => `token=${localStorage.getItem('token')}`

const instance = axios.create({
    baseURL: 'https://ares.ksoes.ru/',
    withCredentials: true,
})
const BASE_API_RESIPIENT = 'api.php?name=group&act=upload_files&get=stat_day'
const BASE_API_SENDER = 'api.php?name=group&act=sender&get=stat_day'

type DataResType<R> = {
    debug: string
    error: string
    message: string
    records: R[]
    success: boolean
}

export const api = {
    // resipient
    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=observatory
    getObservatoryByStatDay() {
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_RESIPIENT}&group=observatory&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?name=group&act=upload_files&get=stat_day&group=observatory&date_end=2023-08-01&date_start=2023-07-29
    getObservatoryByDay(formValues: dateFormValues) {
        const { date_start } = formValues
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_RESIPIENT}&group=observatory&date_end=${date_start}&${getToken()}`)
            .then(res => {
                return { data: res.data, date: date_start }
            })
    },
    getObservatoryByDays(formValues: dateFormValues) {
        const { date_start, date_end } = formValues
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_RESIPIENT}&group=observatory&date_start=${date_start}&date_end=${date_end}&${getToken()}`)
            .then(res => {
                return { data: res.data, date_start, date_end }
            })
    },

    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=mean
    getMeansByStatDay() {
        return instance.get<DataResType<MeansRecordsDayType>>(`${BASE_API_RESIPIENT}&group=mean&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?name=group&act=upload_files&get=stat_day&group=mean&date_end=2023-08-01&date_start=2023-07-29
    getMeansByDay(formValues: dateFormValues) {
        const { date_start } = formValues
        return instance.get<DataResType<MeansRecordsDayType>>(`${BASE_API_RESIPIENT}&group=mean&date_end=${date_start}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    getMeansByDays(formValues: dateFormValues) {
        const { date_start, date_end } = formValues
        return instance.get<DataResType<MeansRecordsDayType>>(`${BASE_API_RESIPIENT}&group=mean&date_start=${date_start}&date_end=${date_end}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },

    // sender

    // https://ares.ksoes.ru/api.php?act=sender&name=group&get=stat_day&
    getObservatoryByStatDaySender() {
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_SENDER}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    getObservatoryByDaySender(formValues: dateFormValues) {
        const { date_start } = formValues
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_SENDER}&date_end=${date_start}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    getObservatoryByDaysSender(formValues: dateFormValues) {
        const { date_start, date_end } = formValues
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`${BASE_API_SENDER}&date_start=${date_start}&date_end=${date_end}&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
}
