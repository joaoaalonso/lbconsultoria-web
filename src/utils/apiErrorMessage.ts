export const getErrorMessage = (err: any, defaultMessage?: string) => {
  return err?.response?.data?.message || defaultMessage || 'Ocorreu um erro inesperado.'
}
