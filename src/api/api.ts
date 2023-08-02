import axios from "axios"

const instance = axios.create({
    baseURL: 'https://ares.ksoes.ru/',
    withCredentials: true,
})

type LoginResType = {
    success: boolean | 0 | 1
    error: string | null
    message: string | null
    getToken?: string
}
type LoginResResType = {
    result?: LoginResType
    success?: boolean | 0 | 1
    error?: string | null
    message?: string | null
    getToken?: string | null
}

export const api = {

    // https://ares.ksoes.ru/_authorization.php?username=logger&password=loggerAnc1&func=getToken
    login(formValues: { username: string, password: string }) {
        return instance.get<LoginResResType>(`_authorization.php?username=${formValues.username}&password=${formValues.password}&func=getToken`)
            .then(res => {
                console.log(res)
                if (res.data.result) return res.data.result
                return res.data
            })
    },
    // 'http://172.18.27.12:3000/statistic/date/bydays/2023-06-01/2023-06-05'
    // Выдает статистические данные отчетов по дням в заданном диапазоне дат
    getReport(date_start: string, date_end: string) {
        // return instance.get<any>(`statistic/date/bydays/${date_start}/${date_end}`)
        //     .then(res => res.data)
    },

}
