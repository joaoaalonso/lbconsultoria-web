import apiClient from './api'
import { Ranch } from '../types'

export type { Ranch }

export const getRanches = async (userId: string): Promise<Ranch[]> => {
  return apiClient
    .get<Ranch[]>(`/users/clients/${userId}/ranches`)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const getRanch = async (ranchId: string): Promise<Ranch> => {
  return apiClient
    .get<Ranch>(`/ranches/${ranchId}`)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const createRanch = async (ranch: Omit<Ranch, 'id'>): Promise<Ranch> => {
  return apiClient
    .post<Ranch>(`/ranches`, ranch)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const editRanch = async (ranch: Ranch): Promise<Ranch> => {
  return apiClient
    .put<Ranch>(`/ranches/${ranch.id}`, ranch)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}

export const deleteRanch = async (ranchId: string): Promise<void> => {
  return apiClient
    .delete(`/ranches/${ranchId}`)
    .then(() => undefined)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}
