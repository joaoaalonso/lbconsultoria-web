import React, { useState } from 'react'
import { Routes as ReactRoutes, Route, Navigate, useNavigate } from 'react-router-dom'

import LoginScreen from './screens/auth/Login'

import ClientListScreen from './screens/clients/List'
import ClientDetailsScreen from './screens/clients/Details'
import ClientFormScreen from './screens/clients/Form'

import RanchFormScreen from './screens/ranches/Form'

import { getToken } from './services/auth'

const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())

    const navigate = useNavigate()

    const onLogin = () => {
        setIsLoggedIn(true)
        navigate('/')
    }

    return (
        <ReactRoutes>
            {!!isLoggedIn && (
                <>
                    <Route path='/clientes' element={<ClientListScreen />} />
                    <Route path='/clientes/adicionar' element={<ClientFormScreen />} />
                    <Route path='/clientes/:userId' element={<ClientDetailsScreen />} />
                    <Route path='/clientes/:userId/editar' element={<ClientFormScreen />} />

                    <Route path='/clientes/:userId/propriedades' element={<RanchFormScreen />} />
                    <Route path='/clientes/:userId/propriedades/:ranchId' element={<RanchFormScreen />} />

                    <Route path='*' element={<Navigate to='/clientes' />} />
                </>
            )}

            {!isLoggedIn && (
                <>
                    <Route path='/login' element={<LoginScreen onLogin={onLogin} />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </>
            )}
        </ReactRoutes>
    )
}

export default Routes