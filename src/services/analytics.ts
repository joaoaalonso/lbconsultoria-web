import { apiClient } from "./api"

export interface AnalyticsSettings {
    userID?: string
	ranchID?: string
	slaughterhouseID?: string
	slaughterhouseUnitID?: string
	sex?: string
	fromDate?: Date
	toDate?: Date
}

export interface AnalyticsResult {
    date: string
    [key: string]: string
}

export const getAnalytics = async (settings: AnalyticsSettings): Promise<any> => {
    return apiClient().post(`/analytics`, { ...settings })
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}
