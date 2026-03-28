import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Routes from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationsProvider } from './contexts/NotificationsContext'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>
          <ErrorBoundary>
            <div className="app">
              <Routes />
            </div>
          </ErrorBoundary>
        </NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
