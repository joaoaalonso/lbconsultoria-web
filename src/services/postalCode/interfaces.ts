interface Address {
  postalCode: string
  streetName: string
  neighborhood: string
  city: string
  state: string
}

interface CepProvider {
  getAddress(postalCode: string): Promise<Address>
}
