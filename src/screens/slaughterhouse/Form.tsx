import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { createSlaughterhouse, editSlaughterhouse, getSlaughterhouse, Slaughterhouse } from '../../services/slaughterhouse'

const SlaughterhouseFormScreen = () => {
    const { state } = useLocation()
    const { slaughterhouseId } = useParams()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: state
    })

    useEffect(() => {
        if (!state && slaughterhouseId) {
            getSlaughterhouse(slaughterhouseId)
                .then(reset)
        }
    }, [slaughterhouseId, state, reset])

    function onSubmit(data: any) {
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
    }

    return (
        <ScreenTemplate
            backLink={slaughterhouseId ? `/abatedouros/${slaughterhouseId}` : '/abatedouros'}
            title={slaughterhouseId ? 'Editar abatedouro' : 'Adicionar abatedouro'}
            noBackground
        >
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
        </ScreenTemplate>
    )
}

export default SlaughterhouseFormScreen