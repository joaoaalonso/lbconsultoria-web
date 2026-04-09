export interface AnalyticsClientSettings {
  userId?: string | null
  ranchId?: string | null
  slaughterhouseId?: string
  slaughterhouseUnitId?: string
  sex?: string | string[]
  fromDate?: Date
  toDate?: Date
}

export interface AnalyticsClientResult {
  pv: number
  pc: number
  rc: number
  date: Date
  pca: number
  sex: string
  value: number
  breed: string
  ranchName: string
  numberOfAnimals: number
  slaughterhouseName: string
}

export interface AnalyticsPerformanceSettings {
  userId?: string | null
  ranchId?: string | null
  sex?: string | string[]
  slaughterhouseId?: string | null
  slaughterhouseUnitId?: string | null
  fromDate?: Date
  toDate?: Date
}

export interface AnalyticsPerformanceResult {
  date: string
  [key: string]: string
}

export interface AnalyticsSlaughterhouseYieldSettings {
  sex?: string | string[]
  slaughterhouseId?: string | null
  slaughterhouseUnitId?: string | null
  fromDate?: Date
  toDate?: Date
}

export interface AnalyticsSlaughterhouseYieldResult {
  rc: number
  date: Date
  sex: string
  slaughterhouseName: string
}
