import { Report } from '../report'

export const renderPhotos = (report: Report) => {
    if (!report.photos || !report.photos.length) return null
    return report.photos.map((photo) => { 
        return { 
            image: photo.id, 
            fit: [550, 760], 
            alignment: 'center' 
        }
    })
}

export const getPhotosProperties = (report: Report) => {
    const photosProperties = {}
    if (!report.photos || !report.photos.length) return photosProperties
    report.photos.forEach(photo => {
        photosProperties[photo.id] = { url: photo.imageUrl }
    })
    return photosProperties
}