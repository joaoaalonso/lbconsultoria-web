import './Login.css'

import React, { useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import logo from '../../images/logo.jpeg'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

import { recoveryPassword } from '../../services/auth'

const RecoveryPasswordScreen = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()

    const onSubmit = (data: any) => {
        setLoading(true)
        const { email } = data

        recoveryPassword(email)
            .then(() => swal('', 'Enviamos um e-mail com as instruções para alterar sua senha.', 'success'))
            .then(() => navigate('/login'))
            .catch(() => { 
                setLoading(false)
                swal('', 'Não foi possível recuperar sua senha no momento.', 'error') 
            })
    }

    return (
        <div className="login-screen">
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                <img src={logo} alt="LB Consultoria" />
                <TextField 
                    name="email"
                    label="E-mail"
                    type="email"
                    register={register}
                    control={control}
                    errors={errors}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant='secondary'
                    text={loading ? "Carregando" : "Continuar"}
                />
                <div className="bottom-link">
                    <Link to="/login">Voltar</Link>
                </div>
            </form>
        </div>
    )
}

export default RecoveryPasswordScreen