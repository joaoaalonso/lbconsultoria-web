import apiClient from './api'
import { ObjectSeqTypeValue, ObjectTypeValue, Report, SimpleReport } from '../types'
import { getErrorMessage } from '../utils/apiErrorMessage'

export type { ObjectSeqTypeValue, ObjectTypeValue, Report, SimpleReport }

const sortPhotos = (report: Report): Report => {
  if (!report.photos) return report
  return {
    ...report,
    photos: [...report.photos].sort((a, b) => a.sortIndex - b.sortIndex),
  }
}

export const getReports = async (page: number): Promise<SimpleReport[]> => {
  return apiClient
    .get<SimpleReport[]>(`/reports`, { params: { page } })
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const getReport = async (reportId: string): Promise<Report> => {
  return apiClient
    .get<Report>(`/reports/${reportId}`)
    .then((response) => sortPhotos(response.data))
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const getReportsByUser = async (userId: string): Promise<Report[]> => {
  return apiClient
    .get<Report[]>(`/users/clients/${userId}/reports`)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const getReportsBySlaughterhouse = async (slaughterhouseId: string): Promise<Report[]> => {
  return apiClient
    .get<Report[]>(`/slaughterhouses/${slaughterhouseId}/reports`)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const createReport = async (
  report: Omit<Report, 'id' | 'user' | 'ranch' | 'slaughterhouse' | 'slaughterhouseUnit'>,
): Promise<Report> => {
  return apiClient
    .post<Report>(`/reports`, report)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const editReport = async (
  report: Omit<Report, 'user' | 'ranch' | 'slaughterhouse' | 'slaughterhouseUnit'>,
): Promise<Report> => {
  return apiClient
    .put<Report>(`/reports/${report.id}`, report)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const deleteReport = async (reportId: string): Promise<void> => {
  return apiClient
    .delete(`/reports/${reportId}`)
    .then(() => undefined)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}
