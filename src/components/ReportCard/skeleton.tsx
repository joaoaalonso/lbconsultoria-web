import './styles.css'

import React from 'react'
import Skeleton from 'react-loading-skeleton'



function SkeletonReportCard() {
    return (
        <div className='report-card'>
            <div className='date'>
                <span className='day'><Skeleton width={30} /></span>
                <span className='month'><Skeleton width={30}/></span>
            </div>
            <div className='content'>
                <div className='title'>
                    <span><Skeleton  width={175} /></span>
                </div>
                <div className='subtitle'>
                    <span><Skeleton width={100} /></span>
                </div>
                <div>
                    <span><Skeleton width={150} /></span>
                </div>
            </div>
            <div className='buttons hide-mobile'>
                <Skeleton width={75} height={25} />
            </div>
        </div>
    )
}

export default SkeletonReportCard