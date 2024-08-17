import React, { useCallback, useEffect } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getAddressFromPostalCode } from '../../services/postalCode'
import { getRanch, createRanch, editRanch } from '../../services/ranches'

const RanchFormScreen = () => {
    const navigate = useNavigate()
    const { userId, ranchId } = useParams()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        reset,
        formState: { errors }
    } = useForm()

    const watchPostalCode = watch('postalCode')

    const handlePostalCodeChange = useCallback((postalCode: string) => {
        const sanitizedPostalCode = postalCode.replace('_', '').replace('-', '')
        if (sanitizedPostalCode.length === 8) {
            getAddressFromPostalCode(sanitizedPostalCode).then(address => {
                setValue('city', address.city)
                setValue('state', address.state)
            })
        }
    }, [setValue])

    useEffect(() => {
        if (ranchId) {
            getRanch(ranchId).then(reset)
        }
    }, [ranchId, reset])

    useEffect(() => {
        if (watchPostalCode) {
            handlePostalCodeChange(watchPostalCode)
        }
    }, [watchPostalCode, handlePostalCodeChange])

    const onSubmit = (data: any) => {
        let handler: any = createRanch
        let params = { userId, ...data }
        let message = 'Propriedade cadastrado com sucesso!'
        

        if (ranchId) {
            handler = editRanch
            params = { id: ranchId, userId, ...data }
            message = 'Propriedade atualizada com sucesso!'
        }

        handler(params)
            .then(() => swal('', message, 'success'))
            .then(() => navigate(`/clientes/${userId}`))
            .catch(e => swal('', e.message, 'error'))
    }

    return (
        <ScreenTemplate
            backLink={`/clientes/${userId}`}
            title={ranchId ? 'Editar propriedade' : 'Adicionar propriedade'}
            noBackground
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='column'>
                        <TextField name='name' label='Nome' register={register} errors={errors} required />
                    </div>
                    <div className='column'>
                        <TextField name='postalCode' label='CEP' mask="11111-111" control={control} register={register} errors={errors} required />
                    </div>
                </div>
                <div className='row'>
                    <div className='column'>
                        <TextField name='address' label='Endereço' register={register} errors={errors} />
                    </div>
                </div>

                <div className='row'>
                    <div className='column'>
                        <TextField name='city' label='Cidade' register={register} errors={errors} required />
                    </div>
                    <div className='column'>
                        <TextField name='state' label='Estado' register={register} errors={errors} required />
                    </div>
                </div>

                <div className='row'>
                    <div className='column'>
                        <TextField name='ie' label='Inscrição' register={register} errors={errors} />
                    </div>
                    <div className='column'>
                        <TextField name='comments' label='Observações' register={register} errors={errors} />
                    </div>
                </div>

                <div className='row'>
                    <Button type='submit' variant='secondary' text={ranchId ? 'Salvar alterações' : 'Cadastrar propriedade'} />
                </div>
            </form>
        </ScreenTemplate>
    )
}

export default RanchFormScreen