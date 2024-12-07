import './styles.css'

import React from 'react'

import { Premature } from '../../services/prematures'

interface PrematureCardProps {
    premature: Premature
}

const PrematureCard = ({ premature }: PrematureCardProps) => {
    const DAYS_TO_REMINDER = 15
    const DAYS_TO_INACTIVE = -10

    const expirationDate = new Date(premature.expirationDate)
    const day = expirationDate.getDate()
    const month = expirationDate.toLocaleString('default', { month: 'short' }).replace('.', '')

    const now = new Date()
    const daysToExpire = Math.floor((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    const isInactive = daysToExpire < DAYS_TO_INACTIVE

    let borderColor = ''
    if (isInactive) {
        borderColor = '#000'
    } else if (daysToExpire < 0) {
        borderColor = '#cc3300'
    } else if (daysToExpire <= DAYS_TO_REMINDER) {
        borderColor = '#ffcc00'
    } else {
        borderColor = '#339900'
    }

    return (
        <div className='premature-card' style={{ borderColor }}>
            <div className='date'>
                <span className='day'>{day}</span>
                <span className='month'>{month}</span>
            </div>
            <div className='content'>
                <div className='title'>
                    <span>{premature.propertyName}</span>
                </div>
                <div className='subtitle'>
                    <span>{premature.clientName}</span>
                </div>
            </div>
            
            <div className='tag'>
                {!isInactive && (
                    <>
                        <span>{Math.abs(daysToExpire)}</span>
                        <span>{daysToExpire === 1 ? 'dia' : 'dias'}</span>
                    </>
                )}
                {isInactive && (<span>inativo</span>)}
                
            </div>
        </div>
    )
}

export default PrematureCard