import './styles.css'

import React from 'react'
// import formatDate from 'date-fns/format'
// import ptBr from 'date-fns/locale/pt-BR'
import { BiChevronRight } from 'react-icons/bi'

import { Report } from '../../services/report'
import { getSexLabel } from '../../services/sex'

interface ReportCardProps {
    report: Report
}

function ReportCard({ report }: ReportCardProps) {
    return (
        <div className='report-card'>
            <span>{report.user.name}</span>
            <span>{report.slaughterhouse.name}</span>
            <span>{report.ranch.name}</span>
            <span>{getSexLabel(report.sex)}</span>
            {/* <span>{formatDate(new Date(report.date), 'dd/MM/yyyy', { locale: ptBr })}</span> */}
            <BiChevronRight />
        </div>
    )
}

export default ReportCard