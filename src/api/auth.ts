import axios from "axios"
import { LoginFormValues } from "../types/types"

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


export const apiAuth = {

    // https://ares.ksoes.ru/_authorization.php?username=test&password=test&func=getToken
    login(formValues: LoginFormValues) {
        debugger
        return instance.get<LoginResType>(`_authorization.php?username=${formValues.username}&password=${formValues.password}&func=getToken`)
            .then(res => {
                if (res.data.result) return res.data.result
                return res.data
            })

    }
}
