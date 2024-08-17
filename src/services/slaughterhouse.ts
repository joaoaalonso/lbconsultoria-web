import { apiClient } from './api'

export interface Slaughterhouse {
    id: string
    name: string
}

export interface SlaughterhouseUnit {
    id: string
    slaughterhouseId: string
    city: string
    state: string
}

export const getSlaughterhouses = async (): Promise<Slaughterhouse[]> => {
    return apiClient().get<Slaughterhouse[]>('/slaughterhouses')
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getSlaughterhouse = async (slaughterhouseId: string): Promise<Slaughterhouse> => {
    return apiClient().get<Slaughterhouse>(`/slaughterhouses/${slaughterhouseId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const createSlaughterhouse = async (slaughterhouse: Omit<Slaughterhouse, 'id'>): Promise<Slaughterhouse> => {
    return apiClient().post<Slaughterhouse>(`/slaughterhouses`, slaughterhouse)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const editSlaughterhouse = async (slaughterhouse: Slaughterhouse): Promise<Slaughterhouse> => {
    return apiClient().put<Slaughterhouse>(`/slaughterhouses/${slaughterhouse.id}`, slaughterhouse)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const deleteSlaughterhouse = async (slaughterhouseId: string): Promise<any> => {
    return apiClient().delete<Slaughterhouse>(`/slaughterhouses/${slaughterhouseId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getSlaughterhouseUnits = async (slaughterhouseId: string): Promise<SlaughterhouseUnit[]> => {
    return apiClient().get<SlaughterhouseUnit[]>(`/slaughterhouses/${slaughterhouseId}/units`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getSlaughterhouseUnit = async (slaughterhouseId: string, slaughterhouseUnitId: string): Promise<SlaughterhouseUnit> => {
    return apiClient().get<SlaughterhouseUnit>(`/slaughterhouses/${slaughterhouseId}/units/${slaughterhouseUnitId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const createSlaughterhouseUnit = async (slaughterhouseId: string, slaughterhouseUnit: Omit<SlaughterhouseUnit, 'id'>): Promise<SlaughterhouseUnit> => {
    return apiClient().post<SlaughterhouseUnit>(`/slaughterhouses/${slaughterhouseId}/units`, slaughterhouseUnit)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const editSlaughterhouseUnit = async (slaughterhouseId: string, slaughterhouseUnit: SlaughterhouseUnit): Promise<SlaughterhouseUnit> => {
    return apiClient().put<SlaughterhouseUnit>(`/slaughterhouses/${slaughterhouseId}/units/${slaughterhouseUnit.id}`, slaughterhouseUnit)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const deleteSlaughterhouseUnit = async (slaughterhouseId: string, slaughterhouseUnitId: string): Promise<any> => {
    return apiClient().delete<SlaughterhouseUnit>(`/slaughterhouses/${slaughterhouseId}/units/${slaughterhouseUnitId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}