import apiClient from './api'
import { getPrematureReminders } from './notifications'
import { Premature } from '../types'

export type { Premature }

const parseResponse = (data: Premature): Premature => {
  return {
    ...data,
    value: data.value && data.value > 0 ? data.value : undefined,
  }
}

export const getPrematures = async (): Promise<Premature[]> => {
  return apiClient
    .get<Premature[]>(`/prematures`)
    .then((response) => response.data.map((data) => parseResponse(data)))
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const getPremature = async (prematureId: string): Promise<Premature> => {
  return apiClient
    .get<Premature>(`/prematures/${prematureId}`)
    .then((response) => parseResponse(response.data))
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const createPremature = async (premature: Omit<Premature, 'id'>): Promise<Premature> => {
  return apiClient
    .post<Premature>(`/prematures`, premature)
    .then((response) => parseResponse(response.data))
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const editPremature = async (premature: Premature): Promise<Premature> => {
  return apiClient
    .put<Premature>(`/prematures/${premature.id}`, premature)
    .then((response) => {
      getPrematureReminders()
      return parseResponse(response.data)
    })
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const deletePremature = async (prematureId: string): Promise<void> => {
  return apiClient
    .delete(`/prematures/${prematureId}`)
    .then(() => undefined)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}
