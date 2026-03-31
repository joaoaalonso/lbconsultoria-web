import axios from 'axios'

interface AwesomeAPIResponse {
  cep: string
  address: string
  district: string
  city: string
  state: string
}

export class AwesomeAPIProvider implements CepProvider {
  private convertToAddress(viaCepAddress: AwesomeAPIResponse): Address {
    return {
      postalCode: viaCepAddress.cep,
      streetName: viaCepAddress.address,
      neighborhood: viaCepAddress.district,
      city: viaCepAddress.city,
      state: viaCepAddress.state,
    }
  }

  async getAddress(postalCode: string): Promise<Address> {
    const url = `https://cep.awesomeapi.com.br/json/${postalCode}`
    const { data } = await axios.get(url)
    return this.convertToAddress(data as AwesomeAPIResponse)
  }
}
