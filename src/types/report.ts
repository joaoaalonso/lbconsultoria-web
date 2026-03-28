import { Photo } from './photo'
import { Ranch } from './ranch'
import { Slaughterhouse, SlaughterhouseUnit } from './slaughterhouse'
import { User } from './user'

export interface ObjectTypeValue {
  id?: string
  type: string
  value: string
}

export interface ObjectSeqTypeValue {
  id?: string
  seq: string
  type: string
  value: string
}

export interface Report {
  id?: string
  date: Date
  slaughterhouseId: string
  slaughterhouse: Slaughterhouse
  slaughterhouseUnitId: string
  slaughterhouseUnit: SlaughterhouseUnit
  userId: string
  user: User
  ranchId: string
  ranch: Ranch
  numberOfAnimals: number
  sex: 'N' | 'V' | 'MI' | 'MC' | 'MI/MC'
  breed: string
  batch: string
  cattleShed: string
  sequential: string
  arroba?: number
  vaccineWeight: number
  pv: number
  totalWeight: number
  corralEvaluation: string
  comments?: string
  penalties?: string
  awards?: string
  photos?: Photo[]
  maturity?: ObjectTypeValue[]
  finishing?: ObjectTypeValue[]
  rumenScore?: ObjectTypeValue[]
  fetus?: ObjectTypeValue[]
  dif?: ObjectSeqTypeValue[]
  bruises?: ObjectSeqTypeValue[]
  createdByUser?: User
  updatedByUser?: User
}

export type SimpleReport = Pick<Report, 'id' | 'date' | 'user' | 'ranch' | 'sex' | 'slaughterhouse'>
