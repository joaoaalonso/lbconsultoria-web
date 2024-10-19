import './SideMenu.css'

import React, { useState, useEffect } from 'react'
import { RiLogoutBoxRLine } from "react-icons/ri"
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import MenuItems from './MenuItems'
import logo from '../../images/logo.jpeg'

import { logoutWithConfirmation } from '../../services/auth'
import { Notifications, addListener, removeListener } from '../../services/notifications'

const SideMenu = () => {
    const ICON_SIZE = 20

    const [menuIsClosed, setMenuIsClosed] = useState(true)
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

    return (
        <div className={`side-menu ${menuIsClosed ? 'side-menu-close' : ''}`}>
            <div className="logo">
                <img src={logo} alt="LB Consultoria" />
            </div>
            <MenuItems notifications={notifications} />
            <button className="logout" onClick={logoutWithConfirmation}>
                <RiLogoutBoxRLine size={25} />
                <span>Sair</span>
            </button>
            <div 
                className='side-menu-minimize' 
                onClick={() => { setMenuIsClosed(!menuIsClosed) }}
            >
                {menuIsClosed ? <BiChevronRight size={ICON_SIZE} /> : <BiChevronLeft size={ICON_SIZE} />}
                <span>Minimizar</span>
            </div>
        </div>
    )
}

export default SideMenu