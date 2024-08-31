import './styles.css'

import React from 'react'
import { Link } from 'react-router-dom'

import { FaEye } from 'react-icons/fa'
import { BiChevronRight, BiEdit } from 'react-icons/bi'

import { Report } from '../../services/report'
import { getSexLabel } from '../../services/sex'
import { isEmployee } from '../../services/auth'

interface ReportCardProps {
    report: Report
}

function ReportCard({ report }: ReportCardProps) {
    const date = new Date(report.date)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' }).replace('.', '')

    return (
        <div className='report-card'>
            <div className='date'>
                <span className='day'>{day}</span>
                <span className='month'>{month}</span>
            </div>
            <div className='content'>
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
            <div className='buttons'>
                {isEmployee() ? (
                    <>
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