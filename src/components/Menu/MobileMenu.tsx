import './MobileMenu.css'

import React from 'react'
import { IoClose } from "react-icons/io5"
import { RiLogoutBoxRLine } from "react-icons/ri"


import MenuItems from './MenuItems'
import { logoutWithConfirmation } from '../../services/auth';

const MobileMenu = ({ visible, onClose }) => {
    return (
        <div className={`mobile-menu ${!visible ? 'mobile-menu-close' : ''}`}>
            <div className='mobile-menu-content'>
                <div className='close'>
                    <IoClose size={25} onClick={onClose} />
                </div>
                <MenuItems />
                <div className="logout" onClick={logoutWithConfirmation}>
                    <RiLogoutBoxRLine size={25} />
                    <span>Sair</span>
                </div>
            </div>
        </div>
    )
}

export default MobileMenu