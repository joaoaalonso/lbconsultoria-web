import { handleApiError } from './handleApiError'

// Build a minimal axios-shaped error without importing axios (avoids ESM issues in CRA Jest)
const makeAxiosError = (data?: unknown, status = 400) => {
  const error = new Error() as Error & { response?: { data: unknown; status: number } }
  error.response = { data, status }
  return error
}

describe('handleApiError', () => {
  it('throws the server message when response.data is a non-empty string', () => {
    expect(() => handleApiError(makeAxiosError('E-mail já cadastrado.'))).toThrow(
      'E-mail já cadastrado.',
    )
  })

  it('falls back to generic message when response.data is empty string', () => {
    expect(() => handleApiError(makeAxiosError(''))).toThrow('Ocorreu um erro inesperado.')
  })

  it('falls back to generic message when response is absent', () => {
    expect(() => handleApiError(new Error('network error'))).toThrow('Ocorreu um erro inesperado.')
  })

  it('falls back to generic message when response.data is an object', () => {
    expect(() => handleApiError(makeAxiosError({ message: 'oops' }))).toThrow(
      'Ocorreu um erro inesperado.',
    )
  })
})
