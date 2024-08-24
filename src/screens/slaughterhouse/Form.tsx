import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { createSlaughterhouse, editSlaughterhouse, getSlaughterhouse } from '../../services/slaughterhouse'

const SlaughterhouseFormScreen = () => {
    const { slaughterhouseId } = useParams()
    const [loading, setLoading] = useState(!!slaughterhouseId)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        if (slaughterhouseId) {
            getSlaughterhouse(slaughterhouseId)
                .then(reset)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
        }
    }, [slaughterhouseId, reset])

    function onSubmit(data: any) {
        setSaving(true)
        
        let handler: any = createSlaughterhouse
        let params = data
        let message = 'Abatedouro cadastrado com sucesso!'

        if (slaughterhouseId) {
            handler = editSlaughterhouse
            params = { id: slaughterhouseId, ...data }
            message = 'Abatedouro atualizado com sucesso!'
        }

        handler(params)
            .then(() => swal('', message, 'success'))
            .then(() => navigate(`/abatedouros`))
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setSaving(false))
    }

    return (
        <ScreenTemplate
            backLink={slaughterhouseId ? `/abatedouros/${slaughterhouseId}` : '/abatedouros'}
            title={slaughterhouseId ? 'Editar abatedouro' : 'Adicionar abatedouro'}
            noBackground
        >
            <>
                <Loading loading={loading} />
                <Loading loading={saving} text="Salvando..." />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='column'>
                            <TextField name='name' label='Nome' register={register} errors={errors} required />
                        </div>
                    </div>

                    <div className='row'>
                        <Button type='submit' variant='secondary' text={slaughterhouseId ? 'Salvar alterações' : 'Cadastrar abatedouro'} />
                    </div>
                </form>
            </>
        </ScreenTemplate>
    )
}

export default SlaughterhouseFormScreen