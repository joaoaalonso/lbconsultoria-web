import React, { createContext, useContext, useEffect, useState } from 'react'
import { Notifications, addListener, removeListener } from '../services/notifications'

const NotificationsContext = createContext<Notifications>({ prematures: 0, total: 0 })

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notifications>({ prematures: 0, total: 0 })

  useEffect(() => {
    const listenerId = addListener(setNotifications)
    return () => removeListener(listenerId)
  }, [])

  return (
    <NotificationsContext.Provider value={notifications}>{children}</NotificationsContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationsContext)
