import React from 'react'

import { Report } from '../../../services/report'

type ReportPhotosProps = {
  report: Report
}

const ReportPhotos: React.FC<ReportPhotosProps> = ({ report }) => {
  return (
    <div className="section">
      {report.photos?.map((photo) => (
        <img key={photo.id} alt="imagem do relatório" src={photo.imageUrl} />
      ))}
    </div>
  )
}

export default ReportPhotos
