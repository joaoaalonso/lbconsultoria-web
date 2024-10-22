import React from 'react'

import { Report } from '../../../services/report'
import { formatDate } from '../../../utils/formatter'
import { getSexLabel } from '../../../services/reportHelpers'

type ReportInformationProps = {
    report: Report
}

const ReportInformation: React.FC<ReportInformationProps> = ({ report }) => {
    return (
        <div className='section'>
            <div className='section-title'>
                INFORMAÇÕES
            </div>
            
            <div className='section-content'>
                <div className='column'>
                    <p>DATA DE ABATE: <b>{formatDate(report.date)}</b></p>
                    <p>UNIDADE ABATEDOURA: <b>{report.slaughterhouse.name.toUpperCase()}</b></p>
                    <p>MUNICÍPIO: <b>{report.slaughterhouseUnit.city.toUpperCase()}</b></p>
                    <p>PROPRIETÁRIO: <b>{report.user.name.toUpperCase()}</b></p>
                    <p>PROPRIEDADE: <b>{report.ranch.name.toUpperCase()}</b></p>
                    <p>MUNICÍPIO: <b>{report.ranch.city.toUpperCase()}</b></p>
                </div>

                <div className='column'>     
                    <p>Nº DE ANIMARIS: <b>{report.numberOfAnimals}</b></p>
                    <p>LOTE: <b>{report.batch}</b></p>       
                    <p>CURRAL: <b>{report.cattleShed}</b></p>
                    <p>SEQUENCIAL: <b>{report.sequential}</b></p>
                    <p>RAÇA: <b>{report.breed.toUpperCase()}</b></p>
                    <p>SEXO: <b>{getSexLabel(report.sex).toUpperCase()}</b></p>
                </div>
            </div>
        </div>
    )   
}

export default ReportInformation