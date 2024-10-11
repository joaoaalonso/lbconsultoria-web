import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { BiTrash } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { recoveryPassword } from '../../services/auth'
import { createEmployee, deleteEmployee, editEmployee, getEmployee } from '../../services/users'

const EmployeeFormScreen = () => {
    const { userId } = useParams()
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(!!userId)
    const [sendingEmail, setSendingEmail] = useState(false)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        if (userId) {
            getEmployee(userId)
                .then(reset)
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
        }
    }, [userId, reset])

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

        let handler: any = createEmployee
        let params = data
        let message = 'Funcionário cadastrado com sucesso!'
        let sendPasswordEmail = false;
        

        if (userId) {
            handler = editEmployee
            params = { id: userId, ...data }
            message = 'Funcionário atualizado com sucesso!'
        } else {
            sendPasswordEmail = true
        }

        handler(params)
            .then(() => swal('', message, 'success'))
            .then(() => {
                if (sendPasswordEmail) {
                    return handlePasswordEmail(params.email)
                }
            })
            .then(() => navigate('/funcionarios'))
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setSaving(false))
    }

    const handleDeleteEmployee = (userId: string) => {
        swal({
            title: 'Deseja realmente remover esse funcionário?',
            icon: 'warning',
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
                deleteEmployee(userId)
                    .then(() => { swal('', 'Funcionário removido com sucesso!', 'success') })
                    .then(() => navigate('/funcionarios'))
                    .catch(e => swal('', e.message, 'error'))
            }
        })
    }

    return (
        <ScreenTemplate
            backLink='/funcionarios'
            title={userId ? 'Editar funcionário' : 'Adicionar funcionário'}
            rightComponent={
                (!!userId ? <BiTrash onClick={() => handleDeleteEmployee(userId)} size={25} className='svg-button' /> : <div></div>)
            }
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
                    </div>

                    <div className='row'>
                        <div className='column'>
                            <TextField name='email' label='Email' register={register} errors={errors} />
                        </div>
                    </div>

                    <div className='row'>
                        <Button type='submit' variant='secondary' text={userId ? 'Salvar alterações' : 'Cadastrar funcionário'} />
                    </div>
                </form>
            </>
        </ScreenTemplate>
    )
}

export default EmployeeFormScreen