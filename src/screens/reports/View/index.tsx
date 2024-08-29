import './index.css'

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ReportHeader from './Header'
import ReportWeights from './Weights'
import ReportPenalties from './Penalties'
import ReportEvaluation from './Evaluation'
import ReportInformation from './Informations'
import ReportCorralEvaluation from './CorralEvaluation'

import { getReport, Report } from '../../../services/report'

const ReportViewScreen = () => {
    const [loading, setLoading] = useState(true)
    const [report, setReport] = useState<Report>()

    const { reportId } = useParams()

    useEffect(() => {
        if (reportId) {
            getReport(reportId)
                .then(setReport)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
        }
    }, [reportId])

    if (!report) {
        return (
            <div>Carregando relatório</div>
        )
    }

    return (
        <div className="report-view">
            <ReportHeader />
            <ReportInformation report={report} />
            <ReportCorralEvaluation report={report} />
            <ReportWeights report={report} />
            <ReportEvaluation report={report} />
            <ReportPenalties report={report} />
        </div>
    )
}

export default ReportViewScreen