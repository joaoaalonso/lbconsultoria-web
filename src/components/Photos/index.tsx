import './index.css'

import React from 'react'
import Compress from 'compress.js'
import { BiPlus, BiX } from 'react-icons/bi'

interface PhotosProps {
    photos: string[]
    setPhotos: (photos: string[]) => void
}

const Photos = ({ photos, setPhotos }: PhotosProps) => {
    const addPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files) {
            const newPhotos: string[] = []
            const compressor = new Compress()

            for (const file of e.target.files) {
                const result = await compressor.compress(file, {
                    quality: 0.7,
                    maxWidth: 1200,
                    maxHeight: 1200,
                })
                newPhotos.push(URL.createObjectURL(result))
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
                        <img src={photo} />
                        <a onClick={() => removePhoto(index)}><BiX size={30} /></a>
                    </div>
                ))}
                {!photos.length && <span>Nenhum foto adicionada</span>}
            </div>
        </div>
    )
}

export default Photos