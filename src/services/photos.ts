import apiClient from './api'
import { Photo } from '../types'

export type { Photo }

export const addImage = async (file: File): Promise<Photo> => {
  const form = new FormData()
  form.append('image', file)

  return apiClient
    .post<Photo>('/images', form)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(err?.response?.data || 'Ocorreu um erro inesperado.')
    })
}
