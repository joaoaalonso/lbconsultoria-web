import React from 'react'

import { Report } from '../../../services/report'
import { sortByType } from '../../../utils/sort'

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
            1: 'Ausente',
            2: 'Escasso',
            3: 'Mediano',
            4: 'Uniforme',
            5: 'Excessivo'
        }
        return finishingNames[finishing]
    }

    report.maturity && sortByType(report.maturity)
    report.finishing && sortByType(report.finishing)
    report.rumenScore && sortByType(report.rumenScore)

    return (
        <div className="section">
            <div className="section-title">
                AVALIAÇÃO DE ABATE
            </div>

            <div className='section-content'>
                <div className='column'>
                    <p>MATURIDADE</p>
                    {report.maturity?.filter(maturity => maturity.value !== '0').map(maturity => (
                        <p>{maturity.type} dentes - {calculatePercentage(maturity.value)}% ({maturity.value})</p>
                    ))}
                </div>
                <div className='column'>
                    <p>ACABAMENTO</p>
                    {report.finishing?.filter(finishing => finishing.value !== '0').map(finishing => (
                        <p>{getFinishingName(finishing.type)} ({finishing.type}) - {calculatePercentage(finishing.value)}% ({finishing.value})</p>
                    ))}
                </div>
                <div className='column'>
                    <p>ESCORE RUMINAL</p>
                    {report.rumenScore?.filter(rumenScore => rumenScore.value !== '0').map(rumenScore => (
                        <p>{rumenScore.type} - {calculatePercentage(rumenScore.value)}% ({rumenScore.value})</p>
                    ))}
                </div>
            </div>
        </div>
    )   
}

export default ReportEvaluation