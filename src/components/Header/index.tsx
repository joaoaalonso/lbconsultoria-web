import './index.css'

import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi"
import { RiLogoutBoxRLine } from "react-icons/ri"

import logo from '../../images/logo.jpeg'

import MobileMenu from '../Menu/MobileMenu'

import { isEmployee, logoutWithConfirmation } from '../../services/auth'
import { Notifications, addListener, removeListener } from '../../services/notifications'

const Header = () => {
    const [menuIsVisible, setMenuIsVisible] = useState(false)
    const [notifications, setNotifications] = useState<Notifications>({
        prematures: 0,
        total: 0
    })

    useEffect(() => {
        const listenerId = addListener(data => {
            setNotifications(data)
        })

        return () => {
            removeListener(listenerId)
        }
    }, [])
    
    const showMenu = isEmployee()

    return (
        <header className='header'>
            <MobileMenu visible={showMenu && menuIsVisible} onClose={() => setMenuIsVisible(false)} />
            <div className='hamburger-menu'>
                {!!showMenu && <GiHamburgerMenu size={18} onClick={() => setMenuIsVisible(true)} />}
                {!!notifications.total && <div className='badge' />}
            </div>
            <div className='logo'>
                <img src={logo} alt="LB Consultoria" />
            </div>
            <div className='logout'>
                {!showMenu && <RiLogoutBoxRLine size={18} onClick={logoutWithConfirmation} />}
            </div>
        </header>
    )
}

export default Header