import axios from "axios"

const instance = axios.create({
    baseURL: 'http://172.18.27.12:3000/',
    withCredentials: true,
})

export const api = {

    // 'http://172.18.27.12:3000/statistic/date/bydays/2023-06-01/2023-06-05'
    // Выдает статистические данные отчетов по дням в заданном диапазоне дат
    getReport(date_start: string, date_end: string) {
        // return instance.get<any>(`statistic/date/bydays/${date_start}/${date_end}`)
        //     .then(res => res.data)
    },

}
