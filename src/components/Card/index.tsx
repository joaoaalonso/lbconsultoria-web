import './styles.css'

import React from 'react'
import { BiChevronRight } from 'react-icons/bi'

interface CardProps {
    text: string
}

const Card = ({ text }: CardProps) => {
    return (
        <div className='generic-card'>
            <span>{text}</span>
            <BiChevronRight />
        </div>
    )
}

export default Card