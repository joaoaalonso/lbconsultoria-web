import React from 'react'

import { Report } from '../../../services/report'
import { formatNumber } from '../../../utils/formatter'
import { getFetuWeight } from '../../../services/settings'
import { sexIsFemale } from '../../../services/reportHelpers'

type ReportFetusProps = {
    report: Report
}

const ReportFetus: React.FC<ReportFetusProps> = ({ report }) => {
    if (!sexIsFemale(report.sex) || !report.fetus ||  Object.keys(report.fetus).length === 0) return null

    const P = +(report.fetus.find(fetus => fetus.type === 'P')?.value || 0)
    const M = +(report.fetus.find(fetus => fetus.type === 'M')?.value || 0)
    const G = +(report.fetus.find(fetus => fetus.type === 'G')?.value || 0)
    const totalQuantity = P + M + G

    const PV = report.pv / 100
    const PC = report.pc / 100

    const totalWeight = P*getFetuWeight('P') + M*getFetuWeight('M') + G*getFetuWeight('G')
    const newPV = PV - (totalWeight / report.numberOfAnimals)
    const newRC = (PC / newPV) * 100


    if (!P && !M && !G) {
        return (
            <div className='section'>
                <div className='section-title'>
                    FÊMEAS PRENHAS
                </div>
                
                <div className='section-content'>
                    <p>NENHUM FETO</p>
                </div>
            </div>
        )
    }

    return (
        <div className='section'>
            <div className='section-title'>
                FÊMEAS PRENHAS
            </div>
            
            <div className='section-content column'>
                <div className='section-fetus'>
                    <p>TERÇO INICIAL DE GESTAÇÃO: <b>{P}</b></p>
                    <p>TERÇO MÉDIA DE GESTAÇÃO: <b>{M}</b></p>
                    <p>TERÇO FINAL DE GESTAÇÃO: <b>{G}</b></p>
                </div>

                <div className='section-fetus'>
                    <p>QUANTIDADE TOTAL: <b>{totalQuantity}</b></p>
                    <p style={{flex: 2}}>PESO TOTAL: <b>{formatNumber(totalWeight)}KG</b></p>
                </div>

                <div className='section-fetus'>
                    <p>PESO VIVO: <b>{formatNumber(newPV)}KG</b></p>
                    <p>PESO DE CARCAÇA: <b>{formatNumber(PC)}KG</b></p>       
                    <p>RENDIMENTO DE CARCAÇA: <b>{newRC.toFixed(1)}%</b></p>
                </div>
            </div>
        </div>
    )   
}

export default ReportFetus