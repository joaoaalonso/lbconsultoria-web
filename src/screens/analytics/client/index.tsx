import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import AnalyticsChart from './Chart'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import DatePicker from '../../../components/DatePicker'
import ScreenTemplate from '../../../components/ScreenTemplate'

import { getClients, User } from '../../../services/users'
import { getRanches, Ranch } from '../../../services/ranches'
import { AnalyticsClientResult, getAnalyticsClient } from '../../../services/analytics'
import { getAvailableSex } from '../../../services/reportHelpers'

const AnalyticsScreen = () => {
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState<string | undefined>(undefined)
    const [ranchName, setRanchName] = useState<string | undefined>(undefined)
    const [analytics, setAnalytics] = useState<AnalyticsClientResult[]>()
    
    const [users, setUsers] = useState<User[]>([])
    const [ranches, setRanches] = useState<Ranch[]>([])

    const [searchParams, setSearchParams] = useSearchParams()

    const {
        handleSubmit,
        watch,
        setValue,
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
                if (r.length === 1) {
                    setValue('ranchId', r[0].id)
                }
            })
        } else {
            setRanches([])
        }
    }, [watchUser, resetField, setValue, setSearchParams])

    const onSubmit = (data: any) => {
        if (!data.userId) {
            swal('', 'Selecione um cliente', 'error')
            return
        }
        
        const user = users.find(user => user.id === data.userId)
        setUserName(user ? user.name : undefined)
            
        if (data.ranchId) {
            const ranch = ranches.find(ranch => ranch.id === data.ranchId)
            setRanchName(ranch ? ranch.name : undefined)
        } else {
            setRanchName(undefined)
        }
        
        setAnalytics(undefined)
        setLoading(true)
        getAnalyticsClient(data)
            .then(data => {
                setAnalytics(data)
                scrollToChart()
            })
            .catch(e => swal('', e.message, 'error'))
            .finally(() => setLoading(false))
    }

    const scrollToChart = () => {
        const timer = setInterval(() => {
            const isChartRendered = !!document.getElementById('chart')
            if (isChartRendered) {
                const mainContent = document.getElementsByClassName('main-content')?.[0]
                if (mainContent) {
                    mainContent.scrollTo({
                        top: mainContent.scrollHeight,
                        behavior: 'smooth'
                    })
                }
                clearInterval(timer)    
            }
        }, 100)
    }
    
    return (
        <ScreenTemplate
            title='Gráfico de cliente'
            backLink='/graficos'
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
                            <Select label='Sexo' name='sex' isClearable control={control} errors={errors} isMulti options={
                                getAvailableSex().map(({ value, label }) => ({ value, label }))
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