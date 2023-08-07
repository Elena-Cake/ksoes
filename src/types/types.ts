export type LoginFormValues = { username: string, password: string }

export type TypesRecordsType = {
    id: number, name: string
}

export type ObservatoryRecordsType = {
    [id: string]: string
}
export type ObservatoryRecordsAppType = {
    code: string
    name: string
}

export type MeansRecordsType = {
    [id: string]: { [id: string]: string }
}
export type MeansRecordsAppType = {
    code: string
    codeInstrument: string
    name: string
}

export type TreeTableType = {
    key: string | number,
    // @ts-ignore
    label: string,
    data: any,
    icon: string,
    children?: TreeTableType[]
}

