import axios from 'axios'
import swal from 'sweetalert'

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