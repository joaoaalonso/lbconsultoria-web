import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import ScreenTemplate from '../../components/ScreenTemplate'

const AnalyticsScreen = () => {
    const navigate = useNavigate()

    return (
        <ScreenTemplate
            title="Gráficos"
            noBackground
        >
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <p>Selecione o tipo de gráfico</p>
                <div style={{ width: '100%', maxWidth: 300 }}>
                <p>
                    <Button
                        text="Cliente"
                        variant='secondary'
                        onClick={() => navigate('/graficos/clientes')}
                    />
                </p>
                <p>
                    <Button
                        text="Desempenho"
                        variant='secondary'
                        onClick={() => navigate('/graficos/desempenho')}
                    />
                </p>
                </div>
            </div>
        </ScreenTemplate>
    )
}

export default AnalyticsScreen