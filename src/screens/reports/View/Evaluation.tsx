import React from 'react'

import { Report } from '../../../services/report'
import { sortByType } from '../../../utils/sort'
import { formatNumber } from '../../../utils/formatter'
import { getArroba } from '../../../services/settings'

type ReportEvaluationProps = {
    report: Report
}

const ReportEvaluation: React.FC<ReportEvaluationProps> = ({ report }) => {
    const calculatePercentage = (value: string): string => {
        const percentage = (+value / report.numberOfAnimals) * 100
        return percentage.toFixed(0)
    }

    const getFinishingName = (finishing) => {
        const finishingNames = {
            1: 'AUSENTE',
            2: 'ESCASSO',
            3: 'MEDIANO',
            4: 'UNIFORME',
            5: 'EXCESSIVO'
        }
        return finishingNames[finishing]
    }

    report.maturity && sortByType(report.maturity)
    report.finishing && sortByType(report.finishing)
    report.rumenScore && sortByType(report.rumenScore)

    const vaccineWeight = report.vaccineWeight / 100
    const vaccinePrice = (report.arroba || 0) / (100 * getArroba()) * vaccineWeight

    const filterData = (data) => {
        return data.seq && data.type && data.value
    }

    const dif = report.dif?.filter(filterData)
    const bruises = report.bruises?.filter(filterData)

    return (
        <div className="section">
            <div className="section-title">
                AVALIAÇÃO DE ABATE
            </div>

            <div className='section-content'>
                <div className='column'>
                    <p><b>MATURIDADE</b></p>
                    {report.maturity?.filter(maturity => maturity.value !== '0').map(maturity => (
                        <p>{maturity.type} DENTES - {calculatePercentage(maturity.value)}% ({maturity.value})</p>
                    ))}
                </div>
                <div className='column'>
                    <p><b>ACABAMENTO</b></p>
                    {report.finishing?.filter(finishing => finishing.value !== '0').map(finishing => (
                        <p>{getFinishingName(finishing.type)} ({finishing.type}) - {calculatePercentage(finishing.value)}% ({finishing.value})</p>
                    ))}
                </div>
                <div className='column'>
                    <p><b>ESCORE RUMINAL</b></p>
                    {report.rumenScore?.filter(rumenScore => rumenScore.value !== '0').map(rumenScore => (
                        <p>{rumenScore.type} - {calculatePercentage(rumenScore.value)}% ({rumenScore.value})</p>
                    ))}
                </div>
            </div>
            
            {!!report.vaccineWeight && (
                <div className='section-content'>
                    <div className='column'>
                        <p>PESO DE VACINA: {formatNumber(vaccineWeight)}KG/CBÇ</p>
                    </div>
                    <div className='column' style={{flex: 2}}>
                        <p>R$ {formatNumber(vaccinePrice)}/CBÇ</p>
                    </div>
                </div>
            )}

            {!!dif?.length && (
                <div className='section-content'>
                    <table className='section-table'>
                        <tr>
                            <th colSpan={3}><b>DIF</b></th>
                        </tr>
                        <tr>
                            <th>SEQUENCIAL</th>
                            <th>MOTIVO</th>
                            <th>DESTINO</th>
                        </tr>
                        {dif.map(dif => (
                            <tr>
                                <td>{dif.seq}</td>
                                <td>{dif.type.toLocaleUpperCase()}</td>
                                <td>{dif.value.toLocaleUpperCase()}</td>
                            </tr>                            
                        ))}
                    </table>
                </div>
            )}

            {!!bruises?.length && (
                <div className='section-content'>
                    <table className='section-table'>
                        <tr>
                            <th colSpan={3}><b>HEMATOMAS</b></th>
                        </tr>
                        <tr>
                            <th>SEQUENCIAL</th>
                            <th>LOCAL</th>
                            <th>ORIGEM</th>
                        </tr>
                        {bruises.map(bruise => (
                            <tr>
                                <td>{bruise.seq}</td>
                                <td>{bruise.type.toLocaleUpperCase()}</td>
                                <td>{bruise.value.toLocaleUpperCase()}</td>
                            </tr>                            
                        ))}
                    </table>
                </div>
            )}
        </div>
    )   
}

export default ReportEvaluation