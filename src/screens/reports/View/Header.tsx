import React from 'react'

import { FaPrint } from 'react-icons/fa6'

import logo from '../../../images/logo.jpeg'

const ReportHeader = () => {
    return (
        <div className='report-header'>
            <img src={logo} alt="Relatório de abate" />
            RELATÓRIO DE ABATE

            <div className='buttons'>
                <button onClick={window.print}>
                    <FaPrint size={24} color='#ff19d5' />
                </button>
            </div>
        </div>
    )
}

export default ReportHeader