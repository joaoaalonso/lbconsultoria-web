import { useEffect } from 'react'
import { getAddressFromPostalCode } from '../services/postalCode'

export type PostalAddress = {
  city: string
  state: string
  streetName: string
  neighborhood: string
}

export function usePostalCode(
  postalCode: string | undefined,
  onAddress: (address: PostalAddress) => void,
) {
  useEffect(() => {
    if (!postalCode) return
    const sanitized = postalCode.replace(/_|-/g, '')
    if (sanitized.length === 8) {
      getAddressFromPostalCode(sanitized).then(onAddress)
    }
    // onAddress is intentionally excluded — callers should pass a stable reference or inline
  }, [postalCode])
}
