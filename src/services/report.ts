import { apiClient } from './api'

import { User } from './users'
import { Photo } from './photos'
import { Ranch } from './ranches'
import { Slaughterhouse, SlaughterhouseUnit } from './slaughterhouse'

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
    slug: string
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
    sex: 'F' | 'MI' | 'MC' | 'MI/MC'
    breed: string
    batch: string
    cattleShed: string
    sequential: string
    arroba?: number
    vaccineWeight: number
    pv: number
    pc: number
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
}

export const getReports = async (): Promise<Report[]> => {
    return apiClient().get<Report[]>(`/reports`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getReport = async (reportId: string): Promise<Report> => {
    return apiClient().get<Report>(`/reports/${reportId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getReportBySlug = async (slug: string): Promise<Report> => {
    return apiClient().get<Report>(`/reports/${slug}/slug`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getReportsByUser = async (userId: string): Promise<Report[]> => {
    return apiClient().get<Report[]>(`/users/clients/${userId}/reports`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getReportsBySlaughterhouse = async (slaughterhouseId: string): Promise<Report[]> => {
    return apiClient().get<Report[]>(`/slaughterhouses/${slaughterhouseId}/reports`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const createReport = async (report: Omit<Report, "id" | "user"  | "slug"  | "ranch" | "slaughterhouse" | "slaughterhouseUnit">): Promise<Report> => {
    return apiClient().post<Report>(`/reports`, report)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const editReport = async (report: Omit<Report, "user"  | "slug" | "ranch" | "slaughterhouse" | "slaughterhouseUnit">): Promise<Report> => {
    return apiClient().put<Report>(`/reports/${report.id}`, report)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const deleteReport = async (reportId: string): Promise<any> => {
    return apiClient().delete<Ranch>(`/reports/${reportId}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}