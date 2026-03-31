import apiClient from './api'
import {
  AnalyticsClientResult,
  AnalyticsClientSettings,
  AnalyticsPerformanceResult,
  AnalyticsPerformanceSettings,
  AnalyticsSlaughterhouseYieldResult,
  AnalyticsSlaughterhouseYieldSettings,
} from '../types'
import { getErrorMessage } from '../utils/apiErrorMessage'

export type {
  AnalyticsClientResult,
  AnalyticsClientSettings,
  AnalyticsPerformanceResult,
  AnalyticsPerformanceSettings,
  AnalyticsSlaughterhouseYieldResult,
  AnalyticsSlaughterhouseYieldSettings,
}

export const getAnalyticsClient = async (
  settings: AnalyticsClientSettings,
): Promise<AnalyticsClientResult[]> => {
  return apiClient
    .post(`/analytics/clients`, { ...settings })
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const getAnalyticsPerformance = async (
  settings: AnalyticsPerformanceSettings,
): Promise<AnalyticsPerformanceResult[]> => {
  return apiClient
    .post(`/analytics/performance`, { ...settings })
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const getAnalyticsSlaughterhouseYield = async (
  settings: AnalyticsSlaughterhouseYieldSettings,
): Promise<AnalyticsSlaughterhouseYieldResult[]> => {
  return apiClient
    .post(`/analytics/slaughterhouse-yield`, { ...settings })
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}
