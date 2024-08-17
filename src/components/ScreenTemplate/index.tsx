import './index.css'

import React from 'react'
import { Link } from 'react-router-dom'
import { BiChevronLeft } from 'react-icons/bi'

import SideMenu from '../SideMenu'

interface ScreenTemplateProps {
    title?: string
    backLink?: string
    children: JSX.Element
    rightComponent?: JSX.Element
    noBackground?: boolean
}

const ScreenTemplate = ({ title, children, backLink, noBackground, rightComponent }: ScreenTemplateProps) => {
    return (
        <>
            <SideMenu />
            <div className='main-content'>
                <div className='top-bar'>
                    <>
                        {!!backLink && (
                            <Link to={backLink}>
                                <BiChevronLeft size={25} />
                            </Link>
                        )}
                        <div style={{ flex: 1 }}>
                            {title}
                        </div>
                        <div>
                            {rightComponent}
                        </div>
                    </>
                </div>
                <div className='content-wrapper'>
                    <div className={`content ${noBackground ? '' : 'content-bg'}`}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScreenTemplate