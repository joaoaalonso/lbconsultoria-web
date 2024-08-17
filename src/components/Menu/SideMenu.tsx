import './SideMenu.css'

import React, { useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import logo from '../../images/logo.jpeg'
import MenuItems from './MenuItems'

const SideMenu = () => {
    const ICON_SIZE = 20

    const [menuIsClosed, setMenuIsClosed] = useState(true)

    return (
        <div className={`side-menu ${menuIsClosed ? 'side-menu-close' : ''}`}>
            <div className="logo">
                <img src={logo} alt="LB Consultoria" />
            </div>
            <MenuItems />
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