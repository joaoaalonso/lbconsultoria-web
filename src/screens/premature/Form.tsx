import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { BiTrash } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import DatePicker from '../../components/DatePicker'
import ScreenTemplate from '../../components/ScreenTemplate'

import { parseNumber } from '../../utils/parser'
import { createPremature, deletePremature, editPremature, getPremature } from '../../services/prematures'

const PrematureFormScreen = () => {
    const { prematureId } = useParams()
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(!!prematureId)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        if (prematureId) {
            getPremature(prematureId)
                .then(data => {
                    const value = data.value ? (data.value / 100).toFixed(2).replace('.', ',') : null
                    reset({...data, value})
                })
                .catch(e => swal('', e.message, 'error'))
                .finally(() => setLoading(false))
        }
    }, [prematureId, reset])

    const onSubmit = (data: any) => {
        setSaving(true)

        let handler: any = createPremature
        let params = {
            ...data, 
            value: data.value ? parseNumber(data.value) : null,
            comments: data.comments !== "" ? data.comments : null
        }
        let message = 'Cadastro realizado com sucesso!'
        

        if (prematureId) {
            handler = editPremature
            params = { id: prematureId, ...params }
            message = 'Cadastro atualizado com sucesso!'
        }

        handler(params)
            .then(() => swal('', message, 'success'))
            .then(() => navigate('/precoce'))
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setSaving(false))
    }

    const handleDelete = (prematureId: string) => {
        swal({
            title: 'Deseja realmente remover esse cadastro?',
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
                deletePremature(prematureId)
                    .then(() => { swal('', 'Cadastro removido com sucesso!', 'success') })
                    .then(() => navigate('/precoce'))
                    .catch(e => swal('', e.message, 'error'))
            }
        })
    }

    return (
        <ScreenTemplate
            backLink='/precoce'
            title={prematureId ? 'Editar cadastro' : 'Adicionar cadastro'}
            rightComponent={
                (!!prematureId ? <BiTrash onClick={() => handleDelete(prematureId)} size={25} className='svg-button' /> : <div></div>)
            }
            noBackground
        >
            <>
                <Loading loading={loading} />
                <Loading loading={saving} text="Salvando..." />
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='column'>
                            <TextField name='clientName' label='Nome do pecuarista' register={register} errors={errors} required />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='column'>
                            <TextField name='propertyName' label='Nome da propriedade' register={register} errors={errors} control={control} required />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='column'>
                            <TextField name='ie' label='Inscrição' register={register} errors={errors} required />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='column'>
                            <DatePicker
                                label="Data de cadastro"
                                name="registrationDate"
                                control={control}
                                errors={errors}
                                required
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='column'>
                            <TextField name='value' label='Valor' register={register} errors={errors} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='column'>
                            <TextField name='comments' label='Observações' type='textarea' register={register} errors={errors} />
                        </div>
                    </div>

                    <div className='row'>
                        <Button type='submit' variant='secondary' text={prematureId ? 'Salvar alterações' : 'Cadastrar'} />
                    </div>
                </form>
            </>
        </ScreenTemplate>
    )
}

export default PrematureFormScreen