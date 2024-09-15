import './index.css'

import React, { useState } from 'react'
import Compress from 'compress.js'
import { BiPlus, BiX } from 'react-icons/bi'

import Loading from '../Loading'

import { addImage, Photo } from '../../services/photos'

interface PhotosProps {
    photos: Photo[]
    setPhotos: (photos: Photo[]) => void
}

const Photos = ({ photos, setPhotos }: PhotosProps) => {
    const [loading, setLoading] = useState(false)

    const addPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files) {
            const newPhotos: Photo[] = []
            const compressor = new Compress()

            for (const file of e.target.files) {
                const result = await compressor.compress(file, {
                    quality: 0.7,
                    maxWidth: 1200,
                    maxHeight: 1200,
                })

                setLoading(true)
                try {
                    const image = await addImage(result)
                    newPhotos.push(image)
                } catch {
                    swal('', 'Ocorreu um erro ao enviar a image', 'error')
                }
                setLoading(false)
            }

            setPhotos([...photos, ...newPhotos])
        }

        const inputElem: any = document?.getElementById('add-photo')
        if (inputElem) {
            inputElem.value = ''
        }
    }

    const removePhoto = (index: number) => {
        const newPhotos = [...photos]
        newPhotos.splice(index, 1)
        setPhotos(newPhotos)
    }

    return (
        <div className='photos-container'>
            <Loading loading={loading} text='Enviando foto' />
            <div className='photos-header'>
                <span>Fotos</span>
                <input 
                    id='add-photo' 
                    type='file' 
                    onChange={addPhoto} 
                    accept='image/*'
                    multiple 
                />
                <label htmlFor='add-photo'><BiPlus /></label>
            </div>
            <div className='photos-body'>
                {photos.map((photo, index) => (
                    <div key={`photo-${index}`} className='photo-wrapper'>
                        <img src={photo.imageUrl} />
                        <a onClick={() => removePhoto(index)}><BiX size={30} /></a>
                    </div>
                ))}
                {!photos.length && <span>Nenhum foto adicionada</span>}
            </div>
        </div>
    )
}

export default Photos