import './Login.css'

import React, { useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

import logo from '../../images/logo.jpeg'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'

import { updatePassword } from '../../services/auth'
import { CNPJ_MASK, CPF_MASK } from '../../utils/mask'

const UpdatePasswordScreen = ({ onLogin }) => {
    const [loading, setLoading] = useState(false)
    const [useCnpjMask, setUseCnpjMask] = useState(false)
    
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get('token')
    const document = searchParams.get('document')

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            document
        }
    })

    const onSubmit = (data: any) => {
        if (!token) return

        setLoading(true)
        const { document, password, confirmPassword } = data

        updatePassword(token, document, password, confirmPassword)
            .then(() => swal('', 'Senha atualizada com sucesso.', 'success'))
            .then(onLogin)
            .catch(err => { 
                setLoading(false)
                swal('', err?.response?.data ?? 'Link inválido ou expirado.', 'error') 
            })
    }

    return (
        <>
            <Loading loading={loading} />
            <div className="login-screen">
                <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
                    <img src={logo} alt="LB Consultoria" />
                    {!!token && (
                        <>
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
                            <TextField
                                name="password"
                                label="Nova senha"
                                type='password' 
                                register={register}
                                control={control}
                                errors={errors}
                                disabled={loading}
                            />
                            <TextField
                                name="confirmPassword"
                                label="Repita a senha"
                                type='password' 
                                register={register}
                                control={control}
                                errors={errors}
                                disabled={loading}
                            />
                            <Button
                                type="submit"
                                variant='secondary'
                                text="Salvar"
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
        </>
    )
}

export default UpdatePasswordScreen