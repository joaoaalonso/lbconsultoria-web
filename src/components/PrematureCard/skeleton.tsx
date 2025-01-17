import './styles.css'

import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonPrematureCard = () => {
    return (
        <div className='premature-card' style={{ borderColor: '#ebebeb' }}>
            <div className='date'>
                <span className='day'><Skeleton width={30} /></span>
                <span className='month'><Skeleton width={30} /></span>
            </div>
            <div className='content'>
                <div className='title'>
                    <span><Skeleton width={150} /></span>
                </div>
                <div className='subtitle'>
                    <span><Skeleton width={200} /></span>
                </div>
            </div>
            
            <div className='tag'>
                <span><Skeleton width={30} /></span>
                <span><Skeleton width={30} /></span>
            </div>
        </div>
    )
}

export default SkeletonPrematureCard