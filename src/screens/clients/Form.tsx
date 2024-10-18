import React, { useCallback, useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { recoveryPassword } from '../../services/auth'
import { getAddressFromPostalCode } from '../../services/postalCode'
import { createClient, editClient, getClient } from '../../services/users'

const ClientFormScreen = () => {
    const { userId } = useParams()
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(!!userId)
    const [sendingEmail, setSendingEmail] = useState(false)

    const navigate = useNavigate()

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
            getClient(userId)
                .then(reset)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
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

    const handlePasswordEmail = async (email: string) => {
        return swal({
            title: 'Deseja enviar o e-mail de criação de senha?',
            buttons: {
                cancel: {
                    visible: true,
                    text: 'Não'
                },
                confirm: {
                    text: 'Sim',
                },
            },
            dangerMode: true,
        })
        .then(confirm => {
            if (confirm) {
                setSendingEmail(true)
                return recoveryPassword(email)
                    .then(() => swal('', 'E-mail de criação de senha enviado com sucesso.', 'success'))
                    .catch(() => { 
                        setSendingEmail(false)
                        swal('', 'Não foi possível enviar o e-mail.', 'error') 
                    })
            }
        })
    }

    const onSubmit = (data: any) => {
        setSaving(true)
        
        let handler: any = createClient
        let params = data
        let message = 'Cliente cadastrado com sucesso!'
        let sendPasswordEmail = !!data.email;
        

        if (userId) {
            handler = editClient
            params = { id: userId, ...data }
            message = 'Cliente atualizado com sucesso!'
            sendPasswordEmail = false
        }

        handler(params)
            .then(() => swal('', message, 'success'))
            .then(() => {
                if (sendPasswordEmail) {
                    return handlePasswordEmail(params.email)
                }
            })
            .then(() => {
                if (!userId) {
                    navigate('/clientes')
                }
            })
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setSaving(false))
    }

    return (
        <ScreenTemplate
            backLink={userId ? `/clientes/${userId}` : '/clientes'}
            title={userId ? 'Editar cliente' : 'Adicionar cliente'}
            noBackground
        >
            <>
                <Loading loading={loading} />
                <Loading loading={saving} text="Salvando..." />
                <Loading loading={sendingEmail} text="Enviando e-mail..." />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='column'>
                            <TextField name='name' label='Nome' register={register} errors={errors} required />
                        </div>
                        <div className='column'>
                            <TextField name='postalCode' label='CEP' maxLength={8} control={control} register={register} errors={errors} required />
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
            </>
        </ScreenTemplate>
    )
}

export default ClientFormScreen