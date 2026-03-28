import apiClient from './api'
import {
  AnalyticsClientResult,
  AnalyticsClientSettings,
  AnalyticsPerformanceResult,
  AnalyticsPerformanceSettings,
} from '../types'

export type {
  AnalyticsClientResult,
  AnalyticsClientSettings,
  AnalyticsPerformanceResult,
  AnalyticsPerformanceSettings,
}

export const getAnalyticsClient = async (
  settings: AnalyticsClientSettings,
): Promise<AnalyticsClientResult[]> => {
  return apiClient
    .post(`/analytics/clients`, { ...settings })
    .then((response) => response.data)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const getAnalyticsPerformance = async (
  settings: AnalyticsPerformanceSettings,
): Promise<AnalyticsPerformanceResult[]> => {
  return apiClient
    .post(`/analytics/performance`, { ...settings })
    .then((response) => response.data)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}
