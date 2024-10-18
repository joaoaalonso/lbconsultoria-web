import './styles.css'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaEye } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { BiChevronRight, BiEdit } from 'react-icons/bi'

import { Report } from '../../services/report'
import { getSexLabel } from '../../services/sex'
import { isEmployee } from '../../services/auth'

interface ReportCardProps {
    report: Report
    downloadPdf: (reportSlug: string) => Promise<void>
}

function ReportCard({ report, downloadPdf }: ReportCardProps) {
    const [bottomSheetIsOpen, setBottomSheetIsOpen] = useState(false)

    const date = new Date(report.date)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' }).replace('.', '')

    const handleOnClick = () => {
        if (window.innerWidth < 800) {
            const bodyOverflow = !bottomSheetIsOpen ? 'hidden' : 'unset'
            document.body.style.overflow = bodyOverflow
            setBottomSheetIsOpen(!bottomSheetIsOpen)
        }
    }

    const handleShare = () => {
        downloadPdf(report.slug)
        handleOnClick()
    }

    return (
        <div className='report-card'>
            <div className='date' onClick={handleOnClick}>
                <span className='day'>{day}</span>
                <span className='month'>{month}</span>
            </div>
            <div className='content' onClick={handleOnClick}>
                <div className='title'>
                    <span>{report.ranch.name}</span>
                </div>
                <div className='subtitle'>
                    <span>{report.slaughterhouse.name}</span>
                </div>
                <div>
                    <span>{getSexLabel(report.sex)}</span>
                </div>
            </div>
            <div 
                className='backdrop' 
                style={{ display: bottomSheetIsOpen ? 'block' : 'none' }}
                onClick={handleOnClick}
            ></div>
            <div className={`bottomsheet hide-desk ${bottomSheetIsOpen ? 'open' : ''}`}>
                <Link to={`/relatorios/${report.id}`}>
                    Editar
                </Link>
                <Link to={`/relatorio/${report.slug}`} target="_blank" rel="noopener noreferrer" onClick={handleOnClick}>
                    Visualizar
                </Link>
                <button onClick={handleShare}>
                    Compartilhar
                </button>
            </div>
            <div className='buttons hide-mobile'>
                {isEmployee() ? (
                    <>
                        <button className='hide-mobile' onClick={() => downloadPdf(report.slug)}>
                            <FaDownload size={25} />
                        </button>
                        <Link to={`/relatorio/${report.slug}`} target="_blank" rel="noopener noreferrer">
                            <FaEye size={25} />
                        </Link>
                        <Link to={`/relatorios/${report.id}`}>
                            <BiEdit size={25} />
                        </Link>
                    </>
                ) : (
                    <Link to={`/relatorio/${report.slug}`} target="_blank" rel="noopener noreferrer">
                        <BiChevronRight size={25} />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default ReportCard