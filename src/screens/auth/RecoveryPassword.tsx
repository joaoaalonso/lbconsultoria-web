import './Login.css'

import React, { useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../images/logo.jpeg'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'

import { recoveryPassword } from '../../services/auth'
import { CNPJ_MASK, CPF_MASK } from '../../utils/mask'

const RecoveryPasswordScreen = () => {
    const [loading, setLoading] = useState(false)
    const [useCnpjMask, setUseCnpjMask] = useState(false)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm()

    const onSubmit = (data: any) => {
        setLoading(true)
        const { document } = data

        recoveryPassword(document)
            .then(() => swal('', 'Enviamos um e-mail com as instruções para alterar sua senha.', 'success'))
            .then(() => navigate('/login'))
            .catch(() => { 
                setLoading(false)
                swal('', 'Não foi possível recuperar sua senha no momento.', 'error') 
            })
    }

    return (
        <>
            <Loading loading={loading} />
            <div className="login-screen">
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <img src={logo} alt="LB Consultoria" />
                    <TextField 
                        mask={useCnpjMask ? CNPJ_MASK : CPF_MASK}
                        name="document"
                        label="CPF/CNPJ"
                        type="tel"
                        register={register}
                        onChange={value => {
                            setUseCnpjMask(value.length > 11)
                        }}
                        control={control}
                        errors={errors}
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        variant='secondary'
                        text="Continuar"
                    />
                    <div className="bottom-link">
                        <Link to="/login">Voltar</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RecoveryPasswordScreen