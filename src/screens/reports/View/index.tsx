import './index.css'

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ReportFetus from './Fetus'
import Signature from './Signature'
import ReportHeader from './Header'
import ReportPhotos from './Photos'
import ReportAwards from './Awards'
import ReportWeights from './Weights'
import ReportComments from './Comments'
import ReportPenalties from './Penalties'
import ReportEvaluation from './Evaluation'
import ReportInformation from './Informations'
import ReportCorralEvaluation from './CorralEvaluation'

import Loading from '../../../components/Loading'
import { getReport, Report } from '../../../services/report'

const ReportViewScreen = () => {
    const [report, setReport] = useState<Report>()

    const { reportId } = useParams()

    useEffect(() => {
        if (reportId) {
            getReport(reportId)
                .then(setReport)
                .catch(e => swal('', e.message, 'error'))
        }
    }, [reportId])

    if (!report) {
        return (
            <Loading loading={true} text='Carregando relatório...' />
        )
    }
    
    return (
        <div className="report-view">
            <div>
                <ReportHeader report={report} />
                <ReportInformation report={report} />
                <ReportCorralEvaluation report={report} />
                <ReportWeights report={report} />
                <ReportEvaluation report={report} />
                <ReportAwards report={report} />
                <ReportPenalties report={report} />
                <ReportFetus report={report} />
                <ReportComments report={report} />
                <Signature />
                <ReportPhotos report={report} />
            </div>
        </div>
    )
}

export default ReportViewScreen