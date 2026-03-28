import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Routes from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationsProvider } from './contexts/NotificationsContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>
          <div className="app">
            <Routes />
          </div>
        </NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
