const ARROBA = 15.0

const FETUS_WEIGHTS = {
    'P': 9,
    'M': 18,
    'G': 36
}

export const getArroba = (): number => {
    return ARROBA
}

export const getFetuWeight = (size: string): number => {
    return FETUS_WEIGHTS[size]
}