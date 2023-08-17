export const getDataWithDots = (data: string) => data.split('-').join('.')


export const checkNameType = (name: string) => {
    if (name.toLowerCase().includes('измерения')) return 'Измерения'
    switch (name) {
        case 'HW Tracks':
            return 'Измерения'
        case 'HW Meteo':
            return 'Метеоданные'
        case 'HW Fci':
            return 'Функциональный контроль'
        case 'HW Frames':
            return 'Локальные зоны'
        case 'HW Verify':
            return 'Верификация'
        default:
            return name
    }
} 
