import axios from 'axios'

import { USER_TYPES } from "./users"

const AUTH_KEY = 'authToken'

export const login = async (email: string, password: string): Promise<void> => {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password
    })
        .then(response => {
            if (!response?.data?.token) {
                throw Error("E-mail e/ou senha incorreto.")
            }
            localStorage.setItem(AUTH_KEY, response.data.token)
        })
}

export const logout = async () => {
    localStorage.removeItem(AUTH_KEY)
    window.location.href = '/login'
}

export const getToken = (): string | null => {
    return localStorage.getItem(AUTH_KEY)
}

export const getUserType = async (): Promise<number> => {
    return USER_TYPES.Client;
}
