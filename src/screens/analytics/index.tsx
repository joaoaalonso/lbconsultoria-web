import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'

import Select from '../../components/Select'
import Button from '../../components/Button'
import AnalyticsChart from './Chart'
import Loading from '../../components/Loading'
import DatePicker from '../../components/DatePicker'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getAvailableSex } from '../../services/reportHelpers'
import { getClients, User } from '../../services/users'
import { getRanches, Ranch } from '../../services/ranches'
import { AnalyticsResult, getAnalytics } from '../../services/analytics'
import { getSlaughterhouses, getSlaughterhouseUnits, Slaughterhouse, SlaughterhouseUnit } from '../../services/slaughterhouse'

const AnalyticsScreen = () => {
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [analytics, setAnalytics] = useState<AnalyticsResult[]>()
    
    const [users, setUsers] = useState<User[]>([])
    const [ranches, setRanches] = useState<Ranch[]>([])
    const [slaughterhouses, setSlaughterhouses] = useState<Slaughterhouse[]>([])
    const [slaughterhouseUnits, setSlaughterhouseUnits] = useState<SlaughterhouseUnit[]>([])

    const {
        handleSubmit,
        watch,
        resetField,
        control,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        getClients()
            .then(u => {
                if (u.length) {
                    setUsers(u)
                }
            })
        getSlaughterhouses()
            .then(s => {
                if (s.length) {
                    setSlaughterhouses(s)
                }
            })
    }, [])

    useEffect(() => {
        if (analytics) {
            let newTotal = 0
            analytics.forEach(data => {
                newTotal += data.count
            })
            setTotal(newTotal)
        }
    }, [analytics])


    const watchUser = watch('userId')
    const watchSlaughterhouse = watch('slaughterhouseId')

    useEffect(() => {
        resetField('ranchId')
        if (watchUser) {
            getRanches(watchUser).then(r => {
                setRanches(r)
            })
        } else {
            setRanches([])
        }
    }, [watchUser, resetField])

    useEffect(() => {
        resetField('slaughterhouseUnitId')
        if (watchSlaughterhouse) {
            getSlaughterhouseUnits(watchSlaughterhouse).then(u => {
                setSlaughterhouseUnits(u)
            })
        } else {
            setSlaughterhouseUnits([])
        }
    }, [watchSlaughterhouse, resetField])

    const scrollToChart = () => {
        const timer = setInterval(() => {
            const isChartRendered = !!document.getElementById('chart-wrapper')
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

    const onSubmit = (data: any) => {
        setAnalytics(undefined)
        setTotal(0)
        setLoading(true)
        getAnalytics(data)
            .then(data => {
                setAnalytics(data)
                scrollToChart()
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
                            <Select label='Proprietário' name='userId' isClearable control={control} errors={errors} options={
                                users.map(user => ({ value: `${user.id}`, label: user.name }))
                            } />
                        </div>
                        <div className='column'>
                            <Select label='Propriedade' name='ranchId' isClearable control={control} errors={errors} options={
                                ranches.map(ranch => ({ value: `${ranch.id}`, label: ranch.name }))
                            } />
                        </div>
                        <div className='column'>
                            <Select label='Sexo' name='sex' control={control} isClearable errors={errors} options={getAvailableSex()} />
                        </div>
                        <div className='column'>
                            <Select label='Abatedouro' name='slaughterhouseId' isClearable control={control} errors={errors} options={
                                slaughterhouses.map(s => ({ value: `${s.id}`, label: s.name }))
                            } />
                        </div>
                        <div className='column'>
                            <Select label='Unidade' name='slaughterhouseUnitId' isClearable control={control} errors={errors} options={
                                slaughterhouseUnits.map(s => ({ value: `${s.id}`, label: s.city }))
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
                    {!!total && <p>Total: <strong>{total}</strong></p>}
                    <AnalyticsChart analytics={analytics} />
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