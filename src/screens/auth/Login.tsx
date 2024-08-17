import './Login.css'

import React, { useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'

import logo from '../../images/logo.jpeg'
import Button from '../../components/Button'
import TextField from '../../components/TextField'

import { login } from '../../services/auth'

const LoginScreen = ({ onLogin }) => {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()

    const onSubmit = (data: any) => {
        setLoading(true)
        const {email, password} = data
        login(email, password)
            .then(onLogin)
            .catch(() => { 
                setLoading(false)
                swal('', 'E-mail e/ou senha incorreto', 'error') 
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
                <TextField
                    name="password"
                    label="Senha"
                    type='password' 
                    register={register}
                    control={control}
                    errors={errors}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant='secondary'
                    text={loading ? "Carregando" : "Entrar"}
                />
            </form>
        </div>
    )
}

export default LoginScreen