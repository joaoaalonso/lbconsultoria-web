const AVAILABLE_SEX = [
    {value: 'F', label: 'Fêmea'},
    {value: 'MI', label: 'Macho inteiro'},
    {value: 'MC', label: 'Macho castrado'},
    {value: 'MI/MC', label: 'Macho inteiro/castrado'}
]

export const getAvailableSex = () => {
    return AVAILABLE_SEX
}

export const getSexLabel = (value: string) => {
    const sex = AVAILABLE_SEX.find(sex => sex.value === value)
    return sex?.label || ''
}

export const getFinishingName = (finishing) => {
    const finishingNames = {
        1: 'AUSENTE',
        2: 'ESCASSO',
        3: 'MEDIANO',
        4: 'UNIFORME',
        5: 'EXCESSIVO'
    }
    return `${finishingNames[finishing]} (${finishing})`
}