export interface AnalyticsClientSettings {
  userID?: string
  ranchID?: string
  slaughterhouseID?: string
  slaughterhouseUnitID?: string
  sex?: string
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
  fromDate?: Date
  toDate?: Date
}

export interface AnalyticsPerformanceResult {
  date: string
  [key: string]: string
}
