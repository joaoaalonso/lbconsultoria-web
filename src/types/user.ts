export interface User {
  id: string
  name: string
  document: string
  email: string
  phone: string
  postalCode: string
  streetName: string
  streetNumber: string
  neighborhood: string
  addressComplement: string
  city: string
  state: string
}

export enum USER_TYPES {
  Client = 1,
  Employee = 2,
  Admin = 3,
}
