import './MenuItems.css'

import React from 'react'
import { NavLink } from 'react-router-dom'
import { GiMeatCleaver } from 'react-icons/gi'
import { FiSettings, FiUsers } from 'react-icons/fi'
import { HiOutlineDocumentReport } from 'react-icons/hi'

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
            <NavLink to='/configs'>
                <FiSettings size={ICON_SIZE} /><span>Configurações</span>
            </NavLink>
        </div>
    )
}

export default MenuItems