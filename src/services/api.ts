import axios from "axios";

import { getToken, logout } from "./auth";

const getHeaders = () => {
    const token = getToken()
    if (token) {
        return {
            'Authorization': `Bearer ${token}`
        }
    }
}

export const apiClient = () => {
    const client = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: getHeaders()
    })

    client.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        if (error.response.status === 401) {
            logout()
        }

        return Promise.reject(error)
    })

    return client
}