import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { BiTrash } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { createEmployee, editEmployee, getEmployee } from '../../services/users'

const EmployeeFormScreen = () => {
    const { userId } = useParams()
    const [loading, setLoading] = useState(!!userId)
    const [saving, setSaving] = useState(false)

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

    function onSubmit(data: any) {
        setSaving(true)

        let handler: any = createEmployee
        let params = data
        let message = 'Funcionário cadastrado com sucesso!'
        

        if (userId) {
            handler = editEmployee
            params = { id: userId, ...data }
            message = 'Funcionário atualizado com sucesso!'
        }

        handler(params)
            .then(() => swal('', message, 'success'))
            .then(() => navigate('/funcionarios'))
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setSaving(false))
    }

    const handleDeleteEmployee = () => {}

    return (
        <ScreenTemplate
            backLink='/funcionarios'
            title={userId ? 'Editar funcionário' : 'Adicionar funcionário'}
            rightComponent={<BiTrash onClick={() => handleDeleteEmployee} size={25} className='svg-button' />}
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