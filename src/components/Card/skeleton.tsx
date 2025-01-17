import './styles.css'

import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonCard = () => {
    const minSize = 150
    const maxSize = 200
    const textSize = Math.random() * (maxSize - minSize) + minSize;
    return (
        <div className='generic-card'>
            <span><Skeleton width={textSize} /></span>
            <Skeleton width={15} />
        </div>
    )
}

export default SkeletonCard