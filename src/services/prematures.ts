import { apiClient } from "./api"
import { getPrematureReminders } from "./notifications"

export interface Premature {
    id: string
    clientName: string
    propertyName: string
    ie: string
    registrationDate: Date
    expirationDate: Date
}

export const getPrematures = async (): Promise<Premature[]> => {
    return apiClient().get<Premature[]>(`/prematures`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getPremature = async (prematureId: string): Promise<Premature> => {
    return apiClient().get<Premature>(`/prematures/${prematureId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const createPremature = async (premature: Omit<Premature, 'id'>): Promise<Premature> => {
    return apiClient().post<Premature>(`/prematures`, premature)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const editPremature = async (premature: Premature): Promise<Premature> => {
    return apiClient().put<Premature>(`/prematures/${premature.id}`, premature)
        .then(response => {
            getPrematureReminders()
            return response.data
        })
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const deletePremature = async (premature: string): Promise<any> => {
    return apiClient().delete<Premature>(`/prematures/${premature}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}