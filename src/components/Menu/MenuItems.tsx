import './MenuItems.css'

import React from 'react'
import { FiUsers } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { FaUserTie } from 'react-icons/fa'
import { GiMeatCleaver } from 'react-icons/gi'
import { HiOutlineDocumentReport } from 'react-icons/hi'

import { isAdmin } from '../../services/auth'

const MenuItems = () => {
    const ICON_SIZE = 20

    return (
        <div className='menu-items'>
            <NavLink to='/relatorios'>
                <HiOutlineDocumentReport size={ICON_SIZE} /><span>Relatório</span>
            </NavLink>
            <NavLink to='/clientes'>
                <FiUsers size={ICON_SIZE} /><span>Clientes</span>
            </NavLink>
            <NavLink to='/abatedouros'>
                <GiMeatCleaver size={ICON_SIZE} /><span>Abatedouros</span>
            </NavLink>
            {!!isAdmin() && (
                <NavLink to='/funcionarios'>
                    <FaUserTie size={ICON_SIZE} /><span>Funcionários</span>
                </NavLink>
            )}
        </div>
    )
}

export default MenuItems