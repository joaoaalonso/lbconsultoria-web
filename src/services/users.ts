import { apiClient } from './api'

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
    Admin = 3
}

const getEndpointByType = (type: USER_TYPES): string => {
    return type === USER_TYPES.Employee ? 'users/employees' : 'users/clients'
}

// USERS
export const getUsers = async (userType: USER_TYPES): Promise<User[]> => {
    const endpoint = getEndpointByType(userType)
    
    return apiClient().get<User[]>(`/${endpoint}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

export const getUser = async (id: string, userType: USER_TYPES): Promise<User> => {
    const endpoint = getEndpointByType(userType)
    
    return apiClient().get<User>(`/${endpoint}/${id}`)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

const createUser = async (user: Omit<User, 'id'>, userType: USER_TYPES): Promise<User> => {
    const endpoint = getEndpointByType(userType)
    
    return apiClient().post<User>(`/${endpoint}`, user)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

const editUser = async (user: User, userType: USER_TYPES): Promise<User> => {
    const endpoint = getEndpointByType(userType)
    
    return apiClient().put<User>(`/${endpoint}/${user.id}`, user)
        .then(response => response.data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

const deleteUser = async (id: string, userType: USER_TYPES): Promise<any> => {
    const endpoint = getEndpointByType(userType)
    
    return apiClient().delete(`/${endpoint}/${id}`)
        .then((data) => data)
        .catch(err => {
            throw Error(err?.response?.data || "Ocorreu um erro inesperado.")
        })
}

// ClIENTS
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

export const deleteClient = async (id: string): Promise<Boolean> => {
    return deleteUser(id, USER_TYPES.Client)
}

// EMPLOYEES