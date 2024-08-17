import { apiClient } from "./api"

export interface Ranch {
    id: string
    userId: string
    name: string
    postalCode: string
    city: string
    state: string
    address: string
    ie: string
    comments: string
}

export const getRanches = async (userId: string): Promise<Ranch[]> => {
    return apiClient().get<Ranch[]>(`/users/clients/${userId}/ranches`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getRanch = async (ranchId: string): Promise<Ranch> => {
    return apiClient().get<Ranch>(`/ranches/${ranchId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const createRanch = async (ranch: Omit<Ranch, 'id'>): Promise<Ranch> => {
    return apiClient().post<Ranch>(`/ranches`, ranch)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const editRanch = async (ranch: Ranch): Promise<Ranch> => {
    return apiClient().put<Ranch>(`/ranches/${ranch.id}`, ranch)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const deleteRanch = async (ranchId: string): Promise<any> => {
    return apiClient().delete<Ranch>(`/ranches/${ranchId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}