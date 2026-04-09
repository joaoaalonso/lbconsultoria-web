import React, { Suspense, lazy } from 'react'
import { Routes as ReactRoutes, Route, Navigate } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'
import Loading from './components/Loading'

const LoginScreen = lazy(() => import('./screens/auth/Login'))
const UpdatePasswordScreen = lazy(() => import('./screens/auth/UpdatePassword'))
const RecoveryPasswordScreen = lazy(() => import('./screens/auth/RecoveryPassword'))

const EmployeeListScreen = lazy(() => import('./screens/employee/List'))
const EmployeeFormScreen = lazy(() => import('./screens/employee/Form'))

const ClientListScreen = lazy(() => import('./screens/clients/List'))
const ClientFormScreen = lazy(() => import('./screens/clients/Form'))
const ClientDetailsScreen = lazy(() => import('./screens/clients/Details'))

const RanchFormScreen = lazy(() => import('./screens/ranches/Form'))

const SlaugtherhouseListScreen = lazy(() => import('./screens/slaughterhouse/List'))
const SlaugtherhouseFormScreen = lazy(() => import('./screens/slaughterhouse/Form'))
const SlaugtherhouseDetailsScreen = lazy(() => import('./screens/slaughterhouse/Details'))
const SlaughterhouseUnitFormScreen = lazy(() => import('./screens/slaughterhouse/UnitForm'))

const ReportListScreen = lazy(() => import('./screens/reports/List'))
const ReportFormScreen = lazy(() => import('./screens/reports/Form'))
const ReportViewScreen = lazy(() => import('./screens/reports/View'))

const PrematureListScreen = lazy(() => import('./screens/premature/List'))
const PrematureFormScreen = lazy(() => import('./screens/premature/Form'))

const AnalyticsScreen = lazy(() => import('./screens/analytics'))
const AnalyticsClientScreen = lazy(() => import('./screens/analytics/client'))
const AnalyticsPerformanceScreen = lazy(() => import('./screens/analytics/performance'))
const AnalyticsSlaughterhouseYieldScreen = lazy(
  () => import('./screens/analytics/slaughterhouseYield'),
)

const Routes = () => {
  const { isLoggedIn } = useAuth()

  return (
    <Suspense fallback={<Loading loading />}>
      <ReactRoutes>
        <Route path="/alterar-senha" element={<UpdatePasswordScreen />} />
        <Route path="/recuperar-senha" element={<RecoveryPasswordScreen />} />

        {!!isLoggedIn && (
          <>
            <Route path="/funcionarios" element={<EmployeeListScreen />} />
            <Route path="/funcionarios/adicionar" element={<EmployeeFormScreen />} />
            <Route path="/funcionarios/:userId" element={<EmployeeFormScreen />} />

            <Route path="/clientes" element={<ClientListScreen />} />
            <Route path="/clientes/adicionar" element={<ClientFormScreen />} />
            <Route path="/clientes/:userId" element={<ClientDetailsScreen />} />
            <Route path="/clientes/:userId/editar" element={<ClientFormScreen />} />

            <Route path="/clientes/:userId/propriedades" element={<RanchFormScreen />} />
            <Route path="/clientes/:userId/propriedades/:ranchId" element={<RanchFormScreen />} />

            <Route path="/abatedouros" element={<SlaugtherhouseListScreen />} />
            <Route path="/abatedouros/adicionar" element={<SlaugtherhouseFormScreen />} />
            <Route
              path="/abatedouros/:slaughterhouseId"
              element={<SlaugtherhouseDetailsScreen />}
            />
            <Route
              path="/abatedouros/:slaughterhouseId/editar"
              element={<SlaugtherhouseFormScreen />}
            />

            <Route
              path="/abatedouros/:slaughterhouseId/unidades/adicionar"
              element={<SlaughterhouseUnitFormScreen />}
            />
            <Route
              path="/abatedouros/:slaughterhouseId/unidades/:slaughterhouseUnitId/editar"
              element={<SlaughterhouseUnitFormScreen />}
            />

            <Route path="/relatorios" element={<ReportListScreen />} />
            <Route path="/relatorios/adicionar" element={<ReportFormScreen />} />
            <Route path="/relatorios/:reportId" element={<ReportFormScreen />} />

            <Route path="/precoce" element={<PrematureListScreen />} />
            <Route path="/precoce/adicionar" element={<PrematureFormScreen />} />
            <Route path="/precoce/:prematureId" element={<PrematureFormScreen />} />

            <Route path="/graficos" element={<AnalyticsScreen />} />
            <Route path="/graficos/clientes" element={<AnalyticsClientScreen />} />
            <Route path="/graficos/desempenho" element={<AnalyticsPerformanceScreen />} />
            <Route path="/graficos/rendimento" element={<AnalyticsSlaughterhouseYieldScreen />} />

            <Route path="/relatorio/:reportId" element={<ReportViewScreen />} />

            <Route path="*" element={<Navigate to="/relatorios" />} />
          </>
        )}

        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </ReactRoutes>
    </Suspense>
  )
}

export default Routes
