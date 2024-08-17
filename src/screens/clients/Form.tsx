import React, { useCallback, useEffect } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import Button from '../../components/Button'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getAddressFromPostalCode } from '../../services/postalCode'
import { createClient, editClient, getClient } from '../../services/users'

const ClientFormScreen = () => {
    const { userId } = useParams()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        reset,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        if (userId) {
            getClient(userId).then(reset)
        }
    }, [userId, reset])

    const watchPostalCode = watch('postalCode')

    const handlePostalCodeChange = useCallback((postalCode: string) => {
        const sanitizedPostalCode = postalCode.replace('_', '').replace('-', '')
        if (sanitizedPostalCode.length === 8) {
            getAddressFromPostalCode(sanitizedPostalCode).then(address => {
                setValue('city', address.city)
                setValue('state', address.state)
                setValue('streetName', address.streetName)
                setValue('neighborhood', address.neighborhood)
            })
        }
    }, [setValue])

    useEffect(() => {
        if (watchPostalCode) {
            handlePostalCodeChange(watchPostalCode)
        }
    }, [watchPostalCode, handlePostalCodeChange])

    function onSubmit(data: any) {
        let handler: any = createClient
        let params = data
        let message = 'Cliente cadastrado com sucesso!'
        

        if (userId) {
            handler = editClient
            params = { id: userId, ...data }
            message = 'Cliente atualizado com sucesso!'
        }

        handler(params)
            .then(() => swal('', message, 'success'))
            .catch(e => swal('', e.message, 'error'))
    }

    return (
        <ScreenTemplate
            backLink={userId ? `/clientes/${userId}` : '/clientes'}
            title={userId ? 'Editar cliente' : 'Adicionar cliente'}
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
                        <TextField name='streetName' label='Endereço' register={register} errors={errors} />
                    </div>
                    <div className='column'>
                        <TextField name='streetNumber' label='Número' register={register} errors={errors} />
                    </div>
                </div>


                <div className='row'>
                    <div className='column'>
                        <TextField name='neighborhood' label='Bairro' register={register} errors={errors} />
                    </div>

                    <div className='column'>
                        <TextField name='addressComplement' label='Complemento' register={register} errors={errors} />
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
                        <TextField name='document' label='CPF/CNPJ' register={register} errors={errors} />
                    </div>
                    <div className='column'>
                        <TextField name='phone' label='Telefone' register={register} errors={errors} />
                    </div>
                </div>

                <div className='row'>
                    <div className='column'>
                        <TextField name='email' label='Email' register={register} errors={errors} />
                    </div>
                </div>

                <div className='row'>
                    <Button type='submit' variant='secondary' text={userId ? 'Salvar alterações' : 'Cadastrar cliente'} />
                </div>
            </form>
        </ScreenTemplate>
    )
}

export default ClientFormScreen