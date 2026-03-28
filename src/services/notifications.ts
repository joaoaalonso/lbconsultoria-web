import apiClient from './api'
import { isAdmin } from './auth'
import { Notifications } from '../types'

export type { Notifications }

let initialized = false

const notifications: Notifications = {
  prematures: 0,
  total: 0,
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

const notifyListeners = () => {
  for (const listener of Object.values(listeners)) {
    listener(notifications)
  }
}

export const getNotifications = () => {
  getPrematureReminders()
}

export const setPrematuresNotifications = (value: number): void => {
  notifications.total = notifications.total - notifications.prematures + value
  notifications.prematures = value
  notifyListeners()
}

export const getPrematureReminders = async (): Promise<void> => {
  if (!isAdmin()) return

  apiClient.get('/prematures/reminders').then((response) => {
    if (response?.data?.reminders >= 0) {
      setPrematuresNotifications(response.data.reminders)
    }
  })
}
