import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { createSlaughterhouseUnit, editSlaughterhouseUnit, getSlaughterhouseUnit } from '../../services/slaughterhouse'

const SlaughterhouseUnitFormScreen = () => {
    const navigate = useNavigate()

    const { slaughterhouseId, slaughterhouseUnitId } = useParams()

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
        }
    }, [slaughterhouseId, slaughterhouseUnitId])

    function onSubmit(data: any) {
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
    }

    return (
        <ScreenTemplate
            backLink={`/abatedouros/${slaughterhouseId}`}
            title={slaughterhouseUnitId ? 'Editar unidade abatedoura' : 'Adicionar unidade abatedoura'}
            noBackground
        >
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
        </ScreenTemplate>
    )
}

export default SlaughterhouseUnitFormScreen