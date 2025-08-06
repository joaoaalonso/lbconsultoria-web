/* eslint-disable jsx-a11y/anchor-is-valid */
import './index.css'
import 'react-image-crop/dist/ReactCrop.css'

import React, { useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'

import Button from '../Button'

interface CropModalProps {
    imageSrc?: string
    onSave: (file: File) => void
    onCancel: () => void
}

const CropModal = ({ imageSrc, onSave, onCancel }: CropModalProps) => {
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    
    const imgRef = useRef<HTMLImageElement>(null)

    const cancelCrop = () => {
        onCancel()
        setCompletedCrop(undefined)
    }

    const saveCroppedPhoto = () => {
        const image = imgRef.current
        if (!image) {
            console.error("[crop] empty image ref")
            return
        }

        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(completedCrop ? completedCrop.width * scaleX : image.naturalWidth)
        canvas.height = Math.floor(completedCrop ? completedCrop.height * scaleY : image.naturalHeight)
        
        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) {
            console.error("[crop] empty canvas ctx")
            return
        }
        
        ctx.imageSmoothingQuality = 'high'

        ctx.save()

        if (completedCrop) {
            const cropX = completedCrop.x * scaleX
            const cropY = completedCrop.y * scaleY
            const centerX = image.naturalWidth / 2
            const centerY = image.naturalHeight / 2
        
            ctx.translate(-cropX, -cropY)
            ctx.translate(centerX, centerY)
            ctx.translate(-centerX, -centerY)
        }

        ctx.drawImage(
          image,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight,
        )
        ctx.restore()
        
        canvas.toBlob(blob => {
            if (blob) {
                const file = new File([blob], "photo.jpeg")
                onSave(file)
                setCompletedCrop(undefined)
            }
        }, 'image/jpeg', 0.7);
      }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        setCrop({ width: 100, height: 100, x: 0, y: 0, unit: '%' })
    }

    return (
        <div className='crop-modal' style={{ display: imageSrc ? 'flex' : 'none' }}>
            <div className='crop-modal-backdrop' />
            <div className='crop-image'>
                <ReactCrop
                    crop={crop}
                    onComplete={setCompletedCrop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                >
                    <img src={imageSrc || ''}
                        alt="Crop"
                        ref={imgRef}
                        onLoad={onImageLoad}
                        crossOrigin='anonymous'
                    />
                </ReactCrop>
                <div className='crop-actions'>
                    <Button
                        text="Cancelar"
                        variant='primary'
                        onClick={cancelCrop}
                    />
                    <Button
                        text="Salvar"
                        variant='secondary'
                        onClick={saveCroppedPhoto}
                    />
                </div>
            </div>
        </div>
    )
}

export default CropModal
