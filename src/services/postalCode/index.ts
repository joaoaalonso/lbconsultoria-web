import { ViaCepProvider } from './viaCep'
import { AwesomeAPIProvider } from './awesomeAPI'

interface AddressCache {
  [key: string]: Address
}

const cache: AddressCache = {}

const PROVIDERS = [new ViaCepProvider(), new AwesomeAPIProvider()]

export const getAddressFromPostalCode = async (postalCode: string): Promise<Address> => {
  if (cache[postalCode]) {
    return cache[postalCode]
  }

  for (const provider of PROVIDERS) {
    try {
      const address = await provider.getAddress(postalCode)
      cache[postalCode] = address
      return address
    } catch (err) {
      console.error(err)
    }
  }

  return {
    postalCode: '',
    streetName: '',
    neighborhood: '',
    city: '',
    state: '',
  }
}
