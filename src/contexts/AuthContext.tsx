import React, { createContext, useContext, useState } from 'react'
import { getToken } from '../services/auth'

type AuthContextType = {
  isLoggedIn: boolean
  onLogin: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())

  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogin: () => setIsLoggedIn(true) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
