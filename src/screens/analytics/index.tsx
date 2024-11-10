import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import AnalyticsChart from './Chart'
import Select from '../../components/Select'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import DatePicker from '../../components/DatePicker'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getClients, User } from '../../services/users'
import { getRanches, Ranch } from '../../services/ranches'
import { AnalyticsResult, getAnalytics } from '../../services/analytics'

const AnalyticsScreen = () => {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState<string | undefined>(undefined)
    const [ranchName, setRanchName] = useState<string | undefined>(undefined)
    const [analytics, setAnalytics] = useState<AnalyticsResult[]>()
    
    const [users, setUsers] = useState<User[]>([])
    const [ranches, setRanches] = useState<Ranch[]>([])

    const [searchParams, setSearchParams] = useSearchParams()

    const {
        handleSubmit,
        watch,
        resetField,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            userId: searchParams.get('userId'),
            ranchId: searchParams.get('ranchId')
        }
    })

    useEffect(() => {
        getClients()
            .then(u => {
                if (u.length) {
                    setUsers(u)
                }
            })
    }, [])

    const watchUser = watch('userId')

    useEffect(() => {
        resetField('ranchId')
        if (watchUser) {
            setSearchParams({ userId: watchUser })
            getRanches(watchUser).then(r => {
                setRanches(r)
            })
        } else {
            setRanches([])
        }
    }, [watchUser, resetField, setSearchParams])

    const onSubmit = (data: any) => {
        if (data.userId) {
            const user = users.find(user => user.id === data.userId)
            setUserName(user ? user.name : undefined)
        } else {
            setUserName(undefined)
        }
        if (data.ranchId) {
            const ranch = ranches.find(ranch => ranch.id === data.ranchId)
            setRanchName(ranch ? ranch.name : undefined)
        } else {
            setRanchName(undefined)
        }
        
        setAnalytics(undefined)
        setLoading(true)
        getAnalytics(data)
            .then(data => {
                setAnalytics(data)
            })
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setLoading(false))
    }

    return (
        <ScreenTemplate
            title='Gráficos'
            noBackground
        >
            <>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='column'>
                            <Select label='Cliente' name='userId' isClearable control={control} errors={errors} options={
                                users.map(user => ({ value: `${user.id}`, label: user.name }))
                            } />
                        </div>
                        <div className='column'>
                            <Select label='Propriedade' name='ranchId' isClearable control={control} errors={errors} options={
                                ranches.map(ranch => ({ value: `${ranch.id}`, label: ranch.name }))
                            } />
                        </div>
                        <div className='column'>
                            <DatePicker
                                label="Data início"
                                name="fromDate"
                                control={control}
                                errors={errors}  
                            />
                        </div>
                        <div className='column'>
                            <DatePicker
                                label="Data término"
                                name="toDate"
                                control={control}
                                errors={errors}  
                            />
                        </div>
                        <div className='row' style={{ alignItems: 'center' }}>
                            <Button type='submit' variant='secondary' text='Atualizar' />
                        </div>
                    </div>
                </form>

                {!!loading && <Loading loading={loading} />}
                {!!analytics && (
                    <>
                    <AnalyticsChart analytics={analytics} userName={userName} ranchName={ranchName} />
                    </>
                )}
                {!loading && !analytics && (
                    <p style={{ width: '100%', textAlign: 'center'}}>
                        Selecione os filtros desejados e clique em 'Atualizar' para gerar o gráfico
                    </p>
                )}
            </>
        </ScreenTemplate>
    )
}

export default AnalyticsScreen