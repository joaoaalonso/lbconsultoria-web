/* eslint-disable jsx-a11y/anchor-is-valid */
import './index.css'

import React, { useState } from 'react'
import Compress from 'compress.js'
import { BiPlus } from 'react-icons/bi'
import { CSS } from '@dnd-kit/utilities'
import { TfiHandDrag } from 'react-icons/tfi'
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable'
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'

import Loading from '../Loading'

import { addImage, Photo } from '../../services/photos'


interface PhotosProps {
    photos: Photo[]
    setPhotos: any
}


const SortablePhoto = ({ photo, remove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isSorting,
        activeIndex,
        index
    } = useSortable({id: photo.id});
    
    let transformStyle: any = transform || {}
    transformStyle.scaleX = isSorting && activeIndex === index ? 1.05 : 1
    transformStyle.scaleY = isSorting && activeIndex === index ? 1.05 : 1

    const style = {
        transform: CSS.Transform.toString(transformStyle),
        transition: transition,
        touchAction: 'none',
    }
    
    return (
        <div ref={setNodeRef} style={style}>
            <div className='photo-wrapper'>
                <a className="photo-sort" {...attributes} {...listeners}><TfiHandDrag size={24} /></a>
                <img alt={`foto ${photo.id}`} src={photo.imageUrl} />
                <a className="photo-delete" onClick={() => remove(photo.id)}>X</a>
            </div>
        </div>
    )
}

const Photos = ({ photos, setPhotos }: PhotosProps) => {
    const [loading, setLoading] = useState(false)
    const sensors = useSensors(
        useSensor(PointerSensor),
    )

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
                    image.sortIndex = photos.length + newPhotos.length
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

    const removePhoto = (id: string) => {
        const newPhotos = [...photos]
        const index = newPhotos.findIndex(photo => photo.id === id)
        newPhotos.splice(index, 1)
        setPhotos(newPhotos)
    }

    const handleDragEnd = (event) => {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            setPhotos((photos: Photo[]) => {
                const oldIndex = photos.findIndex(photo => photo.id === active.id);
                const newIndex = photos.findIndex(photo => photo.id === over.id);
            
                let newArray = arrayMove(photos, oldIndex, newIndex);
                return newArray.map((item,index) => {
                    return {
                        ...item,
                        sortIndex: index
                    }
                })
            })
        }
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
                <DndContext 
                    sensors={sensors}
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCenter}
                >
                    <SortableContext items={photos}>
                        {photos.map(photo => (
                            <SortablePhoto key={photo.id} photo={photo} remove={removePhoto} />
                        ))}
                    </SortableContext>
                </DndContext>
                {!photos.length && <span>Nenhum foto adicionada</span>}
            </div>
        </div>
    )
}

export default Photos