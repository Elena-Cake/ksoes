import axios from "axios"
import { LoginFormValues, MeansRecordsDayType, MeansRecordsType, ObservatoryRecordsDayType, ObservatoryRecordsType, TypesRecordsType } from "../types/types"

const getToken = () => `token=${localStorage.getItem('token')}`

const instance = axios.create({
    baseURL: 'https://ares.ksoes.ru/',
    withCredentials: true,
})

type LoginResResType = {
    success: boolean | 0 | 1
    error: string | null
    message: string | null
    getToken?: string
}
type LoginResType = {
    result?: LoginResResType
    success?: boolean | 0 | 1
    error?: string | null
    message?: string | null
    getToken?: string | null
}

type DataResType<R> = {
    debug: string
    error: string
    message: string
    records: R[]
    success: boolean
}

export const api = {

    // https://ares.ksoes.ru/_authorization.php?username=test&password=test&func=getToken
    login(formValues: LoginFormValues) {
        return instance.get<LoginResType>(`_authorization.php?username=${formValues.username}&password=${formValues.password}&func=getToken`)
            .then(res => {
                if (res.data.result) return res.data.result
                return res.data
            })
    },

    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=types
    getTypes() {
        return instance.get<DataResType<TypesRecordsType>>(`api.php?act=upload_files&name=info&get=types&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=observatory
    getObservatory() {
        return instance.get<DataResType<ObservatoryRecordsType>>(`api.php?act=upload_files&name=info&get=observatory&${getToken()}`)
            .then(res => {
                return res.data
            })
    },

    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=observatory
    getObservatoryByDay() {
        return instance.get<DataResType<ObservatoryRecordsDayType>>(`api.php?act=upload_files&name=group&get=stat_day&group=observatory&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?act=upload_files&name=info&get=means
    getMeans() {
        return instance.get<DataResType<MeansRecordsType>>(`api.php?act=upload_files&name=info&get=means&${getToken()}`)
            .then(res => {
                return res.data
            })
    },
    // https://ares.ksoes.ru/api.php?act=upload_files&name=group&get=stat_day&group=mean
    getMeansByDay() {
        return instance.get<DataResType<MeansRecordsDayType>>(`api.php?act=upload_files&name=group&get=stat_day&group=mean&${getToken()}`)
            .then(res => {
                return res.data
            })
    },


}
