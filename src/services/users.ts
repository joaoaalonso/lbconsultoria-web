import apiClient from './api'
import { User, USER_TYPES } from '../types'
import { getErrorMessage } from '../utils/apiErrorMessage'

export type { User }
export { USER_TYPES }

const getEndpointByType = (type: USER_TYPES): string => {
  return type === USER_TYPES.Employee ? 'users/employees' : 'users/clients'
}

// USERS
export const getUsers = async (userType: USER_TYPES): Promise<User[]> => {
  const endpoint = getEndpointByType(userType)

  return apiClient
    .get<User[]>(`/${endpoint}`)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

export const getUser = async (id: string, userType: USER_TYPES): Promise<User> => {
  const endpoint = getEndpointByType(userType)

  return apiClient
    .get<User>(`/${endpoint}/${id}`)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

const createUser = async (user: Omit<User, 'id'>, userType: USER_TYPES): Promise<User> => {
  const endpoint = getEndpointByType(userType)

  return apiClient
    .post<User>(`/${endpoint}`, user)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

const editUser = async (user: User, userType: USER_TYPES): Promise<User> => {
  const endpoint = getEndpointByType(userType)

  return apiClient
    .put<User>(`/${endpoint}/${user.id}`, user)
    .then((response) => response.data)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

const deleteUser = async (id: string, userType: USER_TYPES): Promise<void> => {
  const endpoint = getEndpointByType(userType)

  return apiClient
    .delete(`/${endpoint}/${id}`)
    .then(() => undefined)
    .catch((err) => {
      throw Error(getErrorMessage(err))
    })
}

// CLIENTS
export const getClients = async (): Promise<User[]> => {
  return getUsers(USER_TYPES.Client)
}

export const getClient = async (id: string): Promise<User> => {
  return getUser(id, USER_TYPES.Client)
}

export const createClient = async (user: Omit<User, 'id'>): Promise<User> => {
  return createUser(user, USER_TYPES.Client)
}

export const editClient = async (user: User): Promise<User> => {
  return editUser(user, USER_TYPES.Client)
}

export const deleteClient = async (id: string): Promise<void> => {
  return deleteUser(id, USER_TYPES.Client)
}

// EMPLOYEES
export const getEmployees = async (): Promise<User[]> => {
  return getUsers(USER_TYPES.Employee)
}

export const getEmployee = async (id: string): Promise<User> => {
  return getUser(id, USER_TYPES.Employee)
}

export const createEmployee = async (user: Omit<User, 'id'>): Promise<User> => {
  return createUser(user, USER_TYPES.Employee)
}

export const editEmployee = async (user: User): Promise<User> => {
  return editUser(user, USER_TYPES.Employee)
}

export const deleteEmployee = async (id: string): Promise<void> => {
  return deleteUser(id, USER_TYPES.Employee)
}
