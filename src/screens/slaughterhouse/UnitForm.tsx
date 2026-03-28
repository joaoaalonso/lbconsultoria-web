import React, { useEffect, useState } from 'react'
import swal from '../../utils/swal'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import {
  createSlaughterhouseUnit,
  editSlaughterhouseUnit,
  getSlaughterhouseUnit,
} from '../../services/slaughterhouse'
import type { SlaughterhouseUnit } from '../../types/slaughterhouse'

const SlaughterhouseUnitFormScreen = () => {
  const navigate = useNavigate()

  const { slaughterhouseId, slaughterhouseUnitId } = useParams()
  const [loading, setLoading] = useState(!!slaughterhouseUnitId)
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<SlaughterhouseUnit, 'id' | 'slaughterhouseId'>>()

  useEffect(() => {
    if (slaughterhouseId && slaughterhouseUnitId) {
      getSlaughterhouseUnit(slaughterhouseId, slaughterhouseUnitId)
        .then(reset)
        .catch((e: Error) => swal('', e.message, 'error'))
        .finally(() => setLoading(false))
    }
  }, [slaughterhouseId, slaughterhouseUnitId, reset])

  function onSubmit(data: Omit<SlaughterhouseUnit, 'id' | 'slaughterhouseId'>) {
    setSaving(true)

    const params: Omit<SlaughterhouseUnit, 'id'> = { slaughterhouseId: slaughterhouseId!, ...data }
    const message = slaughterhouseUnitId
      ? 'Unidade abatedoura atualizado com sucesso!'
      : 'Unidade abatedoura cadastrado com sucesso!'
    const promise = slaughterhouseUnitId
      ? editSlaughterhouseUnit(slaughterhouseId!, { id: slaughterhouseUnitId, ...params })
      : createSlaughterhouseUnit(slaughterhouseId!, params)

    promise
      .then(() => swal('', message, 'success'))
      .then(() => navigate(`/abatedouros/${slaughterhouseId}`))
      .catch((e: Error) => swal('', e.message, 'error'))
      .finally(() => setSaving(false))
  }

  return (
    <ScreenTemplate
      backLink={`/abatedouros/${slaughterhouseId}`}
      title={slaughterhouseUnitId ? 'Editar unidade abatedoura' : 'Adicionar unidade abatedoura'}
      noBackground
    >
      <>
        <Loading loading={loading} />
        <Loading loading={saving} text="Salvando..." />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="column">
              <TextField name="city" label="Cidade" register={register} errors={errors} required />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <TextField name="state" label="Estado" register={register} errors={errors} required />
            </div>
          </div>

          <div className="row">
            <Button
              type="submit"
              variant="secondary"
              text={slaughterhouseUnitId ? 'Salvar alterações' : 'Cadastrar abatedouro'}
            />
          </div>
        </form>
      </>
    </ScreenTemplate>
  )
}

export default SlaughterhouseUnitFormScreen
