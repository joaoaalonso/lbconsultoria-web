export interface Slaughterhouse {
  id: string
  name: string
}

export interface SlaughterhouseUnit {
  id: string
  slaughterhouseId: string
  city: string
  state: string
}
