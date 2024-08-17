import React, { useState } from 'react'
import { Routes as ReactRoutes, Route, Navigate, useNavigate } from 'react-router-dom'

import LoginScreen from './screens/auth/Login'

import ClientListScreen from './screens/clients/List'
import ClientDetailsScreen from './screens/clients/Details'
import ClientFormScreen from './screens/clients/Form'

import RanchFormScreen from './screens/ranches/Form'

import SlaugtherhouseListScreen from './screens/slaughterhouse/List'
import SlaugtherhouseFormScreen from './screens/slaughterhouse/Form'
import SlaugtherhouseDetailsScreen from './screens/slaughterhouse/Details'
import SlaughterhouseUnitFormScreen from './screens/slaughterhouse/UnitForm'

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

                    <Route path='/abatedouros' element={<SlaugtherhouseListScreen />} />
                    <Route path='/abatedouros/adicionar' element={<SlaugtherhouseFormScreen />} />
                    <Route path='/abatedouros/:slaughterhouseId' element={<SlaugtherhouseDetailsScreen />} />
                    <Route path='/abatedouros/:slaughterhouseId/editar' element={<SlaugtherhouseFormScreen />} />

                    <Route path='/abatedouros/:slaughterhouseId/unidades/adicionar' element={<SlaughterhouseUnitFormScreen />} />
                    <Route path='/abatedouros/:slaughterhouseId/unidades/:slaughterhouseUnitId/editar' element={<SlaughterhouseUnitFormScreen />} />

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