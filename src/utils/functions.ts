export const getDataWithDots = (data: string) => data.split('-').join('.')


export const checkNameType = (name: string) => name.toLowerCase().includes('измерения') ? 'Измерения' : name
