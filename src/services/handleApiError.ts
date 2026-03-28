import { AxiosError } from 'axios'

export function handleApiError(err: unknown): never {
  const axiosError = err as AxiosError<string>
  const message = axiosError?.response?.data
  if (typeof message === 'string' && message.length > 0) {
    throw new Error(message)
  }
  throw new Error('Ocorreu um erro inesperado.')
}
