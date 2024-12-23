import React, { useState } from 'react'
import { Routes as ReactRoutes, Route, Navigate, useNavigate } from 'react-router-dom'

import { getToken } from './services/auth'

import LoginScreen from './screens/auth/Login'
import UpdatePasswordScreen from './screens/auth/UpdatePassword'
import RecoveryPasswordScreen from './screens/auth/RecoveryPassword'

import EmployeeListScreen from './screens/employee/List'
import EmployeeFormScreen from './screens/employee/Form'

import ClientListScreen from './screens/clients/List'
import ClientFormScreen from './screens/clients/Form'
import ClientDetailsScreen from './screens/clients/Details'

import RanchFormScreen from './screens/ranches/Form'

import SlaugtherhouseListScreen from './screens/slaughterhouse/List'
import SlaugtherhouseFormScreen from './screens/slaughterhouse/Form'
import SlaugtherhouseDetailsScreen from './screens/slaughterhouse/Details'
import SlaughterhouseUnitFormScreen from './screens/slaughterhouse/UnitForm'

import ReportListScreen from './screens/reports/List'
import ReportFormScreen from './screens/reports/Form'
import ReportViewScreen from './screens/reports/View'

import PrematureListScreen from './screens/premature/List'
import PrematureFormScreen from './screens/premature/Form'

import AnalyticsScreen from './screens/analytics'
import AnalyticsClientScreen from './screens/analytics/client'
import AnalyticsPerformanceScreen from './screens/analytics/performance'

const Routes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getToken())

    const navigate = useNavigate()

    const onLogin = () => {
        setIsLoggedIn(true)
        navigate('/')
    }

    return (
        <ReactRoutes>
            <Route path='/alterar-senha' element={<UpdatePasswordScreen onLogin={onLogin} />} />
            <Route path='/recuperar-senha' element={<RecoveryPasswordScreen />} />

            {!!isLoggedIn && (
                <>
                    <Route path='/funcionarios' element={<EmployeeListScreen />} />
                    <Route path='/funcionarios/adicionar' element={<EmployeeFormScreen />} />
                    <Route path='/funcionarios/:userId' element={<EmployeeFormScreen />} />

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

                    <Route path='/relatorios' element={<ReportListScreen />} />
                    <Route path='/relatorios/adicionar' element={<ReportFormScreen />} />
                    <Route path='/relatorios/:reportId' element={<ReportFormScreen />} />

                    <Route path='/precoce' element={<PrematureListScreen />} />
                    <Route path='/precoce/adicionar' element={<PrematureFormScreen />} />
                    <Route path='/precoce/:prematureId' element={<PrematureFormScreen />} />

                    <Route path='/graficos' element={<AnalyticsScreen />} />
                    <Route path='/graficos/clientes' element={<AnalyticsClientScreen />} />
                    <Route path='/graficos/desempenho' element={<AnalyticsPerformanceScreen />} />

                    <Route path='/relatorio/:reportId' element={<ReportViewScreen />} />

                    <Route path='*' element={<Navigate to='/relatorios' />} />
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