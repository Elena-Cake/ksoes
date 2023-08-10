// AUTH
export type LoginFormValues = { username: string, password: string }

// API
export type TypesRecordsType = {
    id: number, name: string
}


// Observatory
export type ObservatoryRecordsType = {
    [id: string]: string
}
export type ObservatoryRecordsAppType = {
    code: string
    name: string
}

export type ObservatoryRecordsDayType = {
    count: number,
    id_type: number,
    id_observatory: number
}


// Means
export type MeansRecordsType = {
    [id: string]: { [id: string]: string }
}
export type MeansRecordsAppType = {
    id_observatory: string,
    id_mean: string,
    name_mean: string
}
export type MeansRecordsDayType = {
    count: number,
    id_type: number,
    id_mean: number
}

// PrimeReact
export type TreeTableType = {
    key: string | number,
    // label: string,
    data: any,
    // icon: string,
    children?: TreeTableType[]
}


export type dateFormValues = {
    date_start: string,
    date_end?: string,
}

