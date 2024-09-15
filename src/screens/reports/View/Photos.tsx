import React from 'react'

import { Report } from '../../../services/report'

type ReportPhotosProps = {
    report: Report
}

const ReportPhotos: React.FC<ReportPhotosProps> = ({ report }) => {
    return (
        <div className="section">
            {report.photos?.map(photo => (
                <img src={photo.imageUrl} />
            ))}
        </div>
    )   
}

export default ReportPhotos