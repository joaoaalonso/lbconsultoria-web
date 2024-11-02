import axios from 'axios'
import swal from 'sweetalert'

import { USER_TYPES } from "./users"

const AUTH_KEY = 'authToken'

const saveToken = (token: string) => {
    localStorage.setItem(AUTH_KEY, token)   
}

export const login = async (document: string, password: string): Promise<void> => {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        document,
        password
    })
        .then(response => {
            if (!response?.data?.token) {
                throw Error("CPF/CNPJ e/ou senha incorreto.")
            }
            saveToken(response.data.token)
        })
}

export const logout = async () => {
    localStorage.removeItem(AUTH_KEY)
    window.location.href = '/login'
}

export const updatePassword = async (token: string, document: string, password: string, confirmPassword: string): Promise<void> => {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/update-password`, {
        token,
        document,
        password,
        confirmPassword
    })
        .then(response => {
            if (!response?.data?.token) {
                throw Error("CPF/CNPJ e/ou senha incorreto.")
            }
            saveToken(response.data.token)
        })
}

export const recoveryPassword = async (document: string): Promise<void> => {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/recovery-password`, {
        document,
    })
}

const tokenIsValid = (token: string): Boolean => {
    const exp = (JSON.parse(atob(token.split('.')[1]))).exp
    return (Math.floor((new Date()).getTime() / 1000)) < exp
}

export const getToken = (): string | null => {
    const token = localStorage.getItem(AUTH_KEY)
    if (!token) return null
    if (!tokenIsValid(token)) {
        localStorage.removeItem(AUTH_KEY)
        return null
    }
    return token
}

export const getUserType = (): number => {
    const token = getToken()
    if (token) {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        
        return JSON.parse(jsonPayload)?.type || USER_TYPES.Client
    }
    return USER_TYPES.Client
}

export const isEmployee = (): Boolean => {
    const userType = getUserType()
    return [USER_TYPES.Employee, USER_TYPES.Admin].includes(userType)
}

export const isAdmin = (): Boolean => {
    const userType = getUserType()
    return userType === USER_TYPES.Admin
}

export const logoutWithConfirmation = () => {
    swal({
        text: 'Deseja realmente sair?',
        icon: 'warning',
        buttons: {
            cancel: {
                visible: true,
                text: 'Não'
            },
            confirm: {
                text: 'Sim',
            },
        },
        dangerMode: true,
    })
    .then(confirm => {
        if (confirm) {
            logout()   
        }
    })
}