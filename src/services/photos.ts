import { apiClient } from './api'

export interface Photo {
    id: string
    extension: string
    imageUrl: string
    sortIndex: number
}

export const addImage = async (file): Promise<Photo> => {
    const form = new FormData()
    form.append('image', file)

    return apiClient().post<Photo>('/images', form)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}
