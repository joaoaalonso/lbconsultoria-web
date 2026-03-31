import apiClient from './api'
import { Photo } from '../types'
import { getErrorMessage } from '../utils/apiErrorMessage'

export type { Photo }

export const addImage = async (file: File): Promise<Photo> => {
  const form = new FormData()
  form.append('image', file)

  return apiClient
    .post<Photo>('/images', form)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}
