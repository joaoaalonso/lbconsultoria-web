import React, { useEffect, useState } from 'react'
import swal from '../../utils/swal'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import {
  createSlaughterhouse,
  editSlaughterhouse,
  getSlaughterhouse,
} from '../../services/slaughterhouse'
import type { Slaughterhouse } from '../../types/slaughterhouse'

const SlaughterhouseFormScreen = () => {
  const { slaughterhouseId } = useParams()
  const [loading, setLoading] = useState(!!slaughterhouseId)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Slaughterhouse, 'id'>>()

  useEffect(() => {
    if (slaughterhouseId) {
      getSlaughterhouse(slaughterhouseId)
        .then(reset)
        .catch((e: Error) => swal('', e.message, 'error'))
        .finally(() => setLoading(false))
    }
  }, [slaughterhouseId, reset])

  function onSubmit(data: Omit<Slaughterhouse, 'id'>) {
    setSaving(true)

    const message = slaughterhouseId
      ? 'Abatedouro atualizado com sucesso!'
      : 'Abatedouro cadastrado com sucesso!'
    const promise = slaughterhouseId
      ? editSlaughterhouse({ id: slaughterhouseId, ...data })
      : createSlaughterhouse(data)

    promise
      .then(() => swal('', message, 'success'))
      .then(() => navigate(`/abatedouros`))
      .catch((e: Error) => swal('', e.message, 'error'))
      .finally(() => setSaving(false))
  }

  return (
    <ScreenTemplate
      backLink={slaughterhouseId ? `/abatedouros/${slaughterhouseId}` : '/abatedouros'}
      title={slaughterhouseId ? 'Editar abatedouro' : 'Adicionar abatedouro'}
      noBackground
    >
      <>
        <Loading loading={loading} />
        <Loading loading={saving} text="Salvando..." />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="column">
              <TextField name="name" label="Nome" register={register} errors={errors} required />
            </div>
          </div>

          <div className="row">
            <Button
              type="submit"
              variant="secondary"
              text={slaughterhouseId ? 'Salvar alterações' : 'Cadastrar abatedouro'}
            />
          </div>
        </form>
      </>
    </ScreenTemplate>
  )
}

export default SlaughterhouseFormScreen
