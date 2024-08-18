import './Login.css'

import React, { useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import logo from '../../images/logo.jpeg'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

import { updatePassword } from '../../services/auth'

const UpdatePasswordScreen = ({ onLogin }) => {
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get('token')

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()

    const onSubmit = (data: any) => {
        if (!token) return

        setLoading(true)
        const { email, password } = data

        updatePassword(token, email, password)
            .then(() => swal('', 'Senha atualizada com sucesso.', 'success'))
            .then(onLogin)
            .catch(() => { 
                setLoading(false)
                swal('', 'Link inválido ou expirado.', 'error') 
            })
    }

    return (
        <div className="login-screen">
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt="LB Consultoria" />
                {!!token && (
                    <>
                        <TextField 
                            name="email"
                            label="E-mail"
                            type="email"
                            register={register}
                            control={control}
                            errors={errors}
                            disabled={loading}
                        />
                      <TextField
                            name="password"
                            label="Nova senha"
                            type='password' 
                            register={register}
                            control={control}
                            errors={errors}
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            variant='secondary'
                            text={loading ? "Carregando" : "Salvar"}
                        />
                    </>
                )}
                {!token && (
                    <>
                        <h3>Link inválido ou expirado.</h3>
                        <Button
                            variant='secondary'
                            text='Voltar'
                            onClick={() => navigate('/login')}
                        />
                    </>
                )}
            </form>
        </div>
    )
}

export default UpdatePasswordScreen