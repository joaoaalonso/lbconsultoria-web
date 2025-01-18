import './MobileMenu.css'

import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5"
import { RiLogoutBoxRLine } from "react-icons/ri"

import MenuItems from './MenuItems'
import { logoutWithConfirmation } from '../../services/auth';
import { addListener, Notifications, removeListener } from '../../services/notifications'

const MobileMenu = ({ visible, onClose }) => {
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
        <div className={`mobile-menu ${!visible ? 'mobile-menu-close' : ''}`}>
            <div className="backdrop" onClick={onClose} />
            <div className='mobile-menu-content'>
                <div className='close'>
                    <IoClose size={25} onClick={onClose} />
                </div>
                <MenuItems notifications={notifications} />
                <div className="logout" onClick={logoutWithConfirmation}>
                    <RiLogoutBoxRLine size={25} />
                    <span>Sair</span>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu