import './index.css'

import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RiLogoutBoxRLine } from 'react-icons/ri'

import logo from '../../images/logo.jpeg'

import MobileMenu from '../Menu/MobileMenu'

import { isEmployee, logoutWithConfirmation } from '../../services/auth'
import { useNotifications } from '../../contexts/NotificationsContext'

const Header = () => {
  const notifications = useNotifications()
  const [menuIsVisible, setMenuIsVisible] = useState(false)

  const showMenu = isEmployee()

  return (
    <header className="header">
      <MobileMenu visible={showMenu && menuIsVisible} onClose={() => setMenuIsVisible(false)} />
      <div className="hamburger-menu">
        {!!showMenu && <GiHamburgerMenu size={18} onClick={() => setMenuIsVisible(true)} />}
        {!!notifications.total && <div className="badge" />}
      </div>
      <div className="logo">
        <img src={logo} alt="LB Consultoria" />
      </div>
      <div className="logout">
        {!showMenu && <RiLogoutBoxRLine size={18} onClick={logoutWithConfirmation} />}
      </div>
    </header>
  )
}

export default Header
