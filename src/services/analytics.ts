import { apiClient } from "./api"

export interface AnalyticsClientSettings {
    userID?: string
	ranchID?: string
	slaughterhouseID?: string
	slaughterhouseUnitID?: string
	sex?: string
	fromDate?: Date
	toDate?: Date
}

export interface AnalyticsClientResult {
    pv: number
    pc: number
    rc: number
    date: Date
    pva: number
    sex: string
    value: number
    breed: string
    numberOfAnimals: number
    slaughterhouseName: string
}

export interface AnalyticsPerformanceSettings {
    fromDate?: Date
	toDate?: Date
}

export interface AnalyticsPerformanceResult {
    date: string
    [key: string]: string
}

export const getAnalyticsClient = async (settings: AnalyticsClientSettings): Promise<AnalyticsClientResult[]> => {
    return apiClient().post(`/analytics/clients`, { ...settings })
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getAnalyticsPerformance = async (settings: AnalyticsPerformanceSettings): Promise<AnalyticsPerformanceResult[]> => {
    return apiClient().post(`/analytics/performance`, { ...settings })
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}
