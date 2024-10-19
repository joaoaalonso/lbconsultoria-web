import './MenuItems.css'

import React from 'react'
import { FiUsers } from 'react-icons/fi'
import { PiCowFill } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
import { FaUserTie } from 'react-icons/fa'
import { GiMeatCleaver } from 'react-icons/gi'
import { HiOutlineDocumentReport } from 'react-icons/hi'

import { isAdmin, isEmployee } from '../../services/auth'
import { Notifications } from '../../services/notifications'

interface MenuItemsProps {
    notifications: Notifications
}

const MenuItems: React.FC<MenuItemsProps> = ({ notifications }) => {
    const ICON_SIZE = 20
    
    return (
        <div className='menu-items'>
            <NavLink to='/relatorios'>
                <div>
                    <HiOutlineDocumentReport size={ICON_SIZE} /><span>Relatório</span>
                </div>
            </NavLink>
            {isEmployee() && (
                <>
                    <NavLink to='/clientes'>
                        <div>
                            <FiUsers size={ICON_SIZE} /><span>Clientes</span>
                        </div>
                    </NavLink>
                    <NavLink to='/abatedouros'>
                        <div>
                            <GiMeatCleaver size={ICON_SIZE} /><span>Abatedouros</span>
                        </div>
                    </NavLink>
                </>
            )}
            {!!isAdmin() && (
                <>
                    <NavLink to='/funcionarios'>
                        <div>
                            <FaUserTie size={ICON_SIZE} /><span>Funcionários</span>
                        </div>
                    </NavLink>
                    <NavLink to='/precoce'>
                        <div>
                            <PiCowFill size={ICON_SIZE} /><span>Precoce</span>
                        </div>
                        {!!notifications?.prematures && <span className='badge'>{notifications.prematures}</span>}
                    </NavLink>
                </>
            )}
        </div>
    )
}

export default MenuItems