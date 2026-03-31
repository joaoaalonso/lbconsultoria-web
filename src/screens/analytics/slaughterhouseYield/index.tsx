import React, { useEffect, useState } from 'react'
import swal from '../../../utils/swal'
import { useForm } from 'react-hook-form'

import AnalyticsChart from './Chart'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import DatePicker from '../../../components/DatePicker'
import ScreenTemplate from '../../../components/ScreenTemplate'

import { getAvailableSex } from '../../../services/reportHelpers'
import {
  AnalyticsSlaughterhouseYieldResult,
  AnalyticsSlaughterhouseYieldSettings,
  getAnalyticsSlaughterhouseYield,
} from '../../../services/analytics'
import {
  getSlaughterhouses,
  getSlaughterhouseUnits,
  Slaughterhouse,
  SlaughterhouseUnit,
} from '../../../services/slaughterhouse'

const AnalyticsScreen = () => {
  const [loading, setLoading] = useState(false)
  const [analytics, setAnalytics] = useState<AnalyticsSlaughterhouseYieldResult[]>()

  const [slaughterhouses, setSlaughterhouses] = useState<Slaughterhouse[]>([])
  const [slaughterhouseUnits, setSlaughterhouseUnits] = useState<SlaughterhouseUnit[]>([])

  const {
    handleSubmit,
    watch,
    resetField,
    control,
    formState: { errors },
  } = useForm<AnalyticsSlaughterhouseYieldSettings>()

  useEffect(() => {
    getSlaughterhouses().then((s) => {
      if (s.length) {
        setSlaughterhouses(s)
      }
    })
  }, [])

  const watchSlaughterhouse = watch('slaughterhouseId')

  useEffect(() => {
    resetField('slaughterhouseUnitId')
    if (watchSlaughterhouse) {
      getSlaughterhouseUnits(watchSlaughterhouse).then((u) => {
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
            behavior: 'smooth',
          })
        }
        clearInterval(timer)
      }
    }, 100)
  }

  const onSubmit = (data: AnalyticsSlaughterhouseYieldSettings) => {
    setAnalytics(undefined)
    setLoading(true)
    getAnalyticsSlaughterhouseYield(data)
      .then((data) => {
        setAnalytics(data)
        scrollToChart()
      })
      .catch((e: unknown) => swal('', e instanceof Error ? e.message : 'Ocorreu um erro.', 'error'))
      .finally(() => setLoading(false))
  }

  return (
    <ScreenTemplate title="Gráfico de rendimento" backLink="/graficos" noBackground>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="column">
              <Select
                label="Sexo"
                name="sex"
                control={control}
                isMulti
                isClearable
                errors={errors}
                options={getAvailableSex()}
              />
            </div>
            <div className="column">
              <Select
                label="Abatedouro"
                name="slaughterhouseId"
                isClearable
                control={control}
                errors={errors}
                options={slaughterhouses.map((s) => ({ value: `${s.id}`, label: s.name }))}
              />
            </div>
            <div className="column">
              <Select
                label="Unidade"
                name="slaughterhouseUnitId"
                isClearable
                control={control}
                errors={errors}
                options={slaughterhouseUnits.map((s) => ({ value: `${s.id}`, label: s.city }))}
              />
            </div>
            <div className="column">
              <DatePicker
                label="Data início"
                name="fromDate"
                control={control}
                errors={errors}
                onlyMonthYear
              />
            </div>
            <div className="column">
              <DatePicker
                label="Data término"
                name="toDate"
                control={control}
                errors={errors}
                onlyMonthYear
              />
            </div>
            <div className="row" style={{ alignItems: 'center' }}>
              <Button type="submit" variant="secondary" text="Atualizar" />
            </div>
          </div>
        </form>

        {!!loading && <Loading loading={loading} />}
        {!!analytics && (
          <>
            <AnalyticsChart analytics={analytics} />
          </>
        )}
        {!loading && !analytics && (
          <p style={{ width: '100%', textAlign: 'center' }}>
            Selecione os filtros desejados e clique em 'Atualizar' para gerar o gráfico
          </p>
        )}
      </>
    </ScreenTemplate>
  )
}

export default AnalyticsScreen
