import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '../../components/Button'
import Loading from '../../components/Loading'
import TextField from '../../components/TextField'
import ScreenTemplate from '../../components/ScreenTemplate'

import { getRanch, createRanch, editRanch } from '../../services/ranches'
import { POSTAL_CODE_MASK } from '../../utils/mask'
import { usePostalCode } from '../../hooks/usePostalCode'

const RanchFormScreen = () => {
  const navigate = useNavigate()
  const { userId, ranchId } = useParams()
  const [loading, setLoading] = useState(!!ranchId)
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm()

  const watchPostalCode = watch('postalCode')

  usePostalCode(watchPostalCode, (address) => {
    setValue('city', address.city)
    setValue('state', address.state)
  })

  useEffect(() => {
    if (ranchId) {
      getRanch(ranchId)
        .then(reset)
        .catch((e: Error) => swal('', e.message, 'error'))
        .finally(() => setLoading(false))
    }
  }, [ranchId, reset])

  const onSubmit = (data: any) => {
    setSaving(true)

    let handler: any = createRanch
    let params = { userId, ...data }
    let message = 'Propriedade cadastrado com sucesso!'

    if (ranchId) {
      handler = editRanch
      params = { id: ranchId, userId, ...data }
      message = 'Propriedade atualizada com sucesso!'
    }

    handler(params)
      .then(() => swal('', message, 'success'))
      .then(() => navigate(`/clientes/${userId}`))
      .catch((e: Error) => swal('', e.message, 'error'))
      .finally(() => setSaving(false))
  }

  return (
    <ScreenTemplate
      backLink={`/clientes/${userId}`}
      title={ranchId ? 'Editar propriedade' : 'Adicionar propriedade'}
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
            <div className="column">
              <TextField
                mask={POSTAL_CODE_MASK}
                name="postalCode"
                label="CEP"
                control={control}
                register={register}
                errors={errors}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="column">
              <TextField name="address" label="Endereço" register={register} errors={errors} />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <TextField name="city" label="Cidade" register={register} errors={errors} required />
            </div>
            <div className="column">
              <TextField name="state" label="Estado" register={register} errors={errors} required />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <TextField name="ie" label="Inscrição" register={register} errors={errors} />
            </div>
            <div className="column">
              <TextField name="comments" label="Observações" register={register} errors={errors} />
            </div>
          </div>

          <div className="row">
            <Button
              type="submit"
              variant="secondary"
              text={ranchId ? 'Salvar alterações' : 'Cadastrar propriedade'}
            />
          </div>
        </form>
      </>
    </ScreenTemplate>
  )
}

export default RanchFormScreen
