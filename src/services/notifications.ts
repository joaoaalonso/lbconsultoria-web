import { apiClient } from "./api"
import { isAdmin } from "./auth"

export interface Notifications {
    prematures: number
    total: number
}

let initialized = false

const notifications = {
    prematures: 0,
    total: 0
}

const listeners: { [key: number]: (notifications: Notifications) => void } = {}

export const addListener = (listener: (notifications: Notifications) => void): number => {
    const listenerId = Math.floor(Math.random() * 10000) + 1
    listeners[listenerId] = listener
    if (!initialized) {
        initialized = true
        getNotifications()
    }
    listener(notifications)
    return listenerId
}

export const removeListener = (listenerId: number) => {
    delete listeners[listenerId]
}

const notifiyListeners = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, listener] of Object.entries(listeners)) {
        listener(notifications)
    }
}

export const getNotifications = () => {
    getPrematureReminders()
}

export const setPrematuresNotifications = (value: number): void => {
    notifications.total = notifications.total - notifications.prematures + value
    notifications.prematures = value
    notifiyListeners()
}

export const getPrematureReminders = async (): Promise<void> => {
    if (!isAdmin()) return

    apiClient().get('/prematures/reminders')
        .then(response => {
            if (response?.data?.reminders >= 0) {
                setPrematuresNotifications(response.data.reminders)
            }
        })
}