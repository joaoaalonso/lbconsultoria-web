import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { BiTrash } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { createEmployee, editEmployee, getEmployee } from '../../services/users'

const EmployeeFormScreen = () => {
    const { state } = useLocation()
    const { userId } = useParams()

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
        if (!state && userId) {
            getEmployee(userId)
                .then(reset)
                .catch(e => swal('', e.message, 'error'))
        }
    }, [userId, state, reset])

    function onSubmit(data: any) {
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
    }

    const handleDeleteEmployee = () => {}

    return (
        <ScreenTemplate
            backLink='/funcionarios'
            title={userId ? 'Editar funcionário' : 'Adicionar funcionário'}
            rightComponent={<BiTrash onClick={() => handleDeleteEmployee} size={25} className='svg-button' />}
            noBackground
        >
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
                    <Button type='submit' variant='secondary' text={userId ? 'Salvar alterações' : 'Cadastrar cliente'} />
                </div>
            </form>
        </ScreenTemplate>
    )
}

export default EmployeeFormScreen