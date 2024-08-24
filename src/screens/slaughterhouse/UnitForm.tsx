import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { createSlaughterhouseUnit, editSlaughterhouseUnit, getSlaughterhouseUnit } from '../../services/slaughterhouse'

const SlaughterhouseUnitFormScreen = () => {
    const navigate = useNavigate()

    const { slaughterhouseId, slaughterhouseUnitId } = useParams()
    const [loading, setLoading] = useState(!!slaughterhouseUnitId)
    const [saving, setSaving] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        if (slaughterhouseId && slaughterhouseUnitId) {
            getSlaughterhouseUnit(slaughterhouseId, slaughterhouseUnitId)
                .then(reset)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
        }
    }, [slaughterhouseId, slaughterhouseUnitId, reset])

    function onSubmit(data: any) {
        setSaving(true)

        let handler: any = createSlaughterhouseUnit
        let params = { slaughterhouseId, ...data }
        let message = 'Unidade abatedoura cadastrado com sucesso!'

        if (slaughterhouseUnitId) {
            handler = editSlaughterhouseUnit
            params = { id: slaughterhouseUnitId, slaughterhouseId, ...data }
            message = 'Unidade abatedoura atualizado com sucesso!'
        }

        handler(slaughterhouseId, params)
            .then(() => swal('', message, 'success'))
            .then(() => navigate(`/abatedouros/${slaughterhouseId}`))
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setSaving(false))
    }

    return (
        <ScreenTemplate
            backLink={`/abatedouros/${slaughterhouseId}`}
            title={slaughterhouseUnitId ? 'Editar unidade abatedoura' : 'Adicionar unidade abatedoura'}
            noBackground
        >
            <>
                <Loading loading={loading} />
                <Loading loading={saving} text="Salvando..." />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='column'>
                            <TextField name='city' label='Cidade' register={register} errors={errors} required />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='column'>
                            <TextField name='state' label='Estado' register={register} errors={errors} required />
                        </div>
                    </div>

                    <div className='row'>
                        <Button type='submit' variant='secondary' text={slaughterhouseUnitId ? 'Salvar alterações' : 'Cadastrar abatedouro'} />
                    </div>
                </form>
            </>
        </ScreenTemplate>
    )
}

export default SlaughterhouseUnitFormScreen