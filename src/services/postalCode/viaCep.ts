import axios from 'axios'

interface ViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

export class ViaCepProvider implements CepProvider {
  private convertToAddress(viaCepAddress: ViaCepResponse): Address {
    return {
      postalCode: viaCepAddress.cep,
      streetName: viaCepAddress.logradouro,
      neighborhood: viaCepAddress.bairro,
      city: viaCepAddress.localidade,
      state: viaCepAddress.uf,
    }
  }

  async getAddress(postalCode: string): Promise<Address> {
    const url = `https://viacep.com.br/ws/${postalCode}/json/`
    const { data } = await axios.get(url)
    if (data.erro) {
      throw Error('CEP não encontrado')
    }
    return this.convertToAddress(data as ViaCepResponse)
  }
}
