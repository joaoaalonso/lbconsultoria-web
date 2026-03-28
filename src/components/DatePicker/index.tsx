import './index.css'
import 'react-datepicker/dist/react-datepicker.css'

import React from 'react'
import { Controller, Control, FieldErrors, FieldValues } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'

interface DatePickerProps {
  errors?: FieldErrors<any>
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  label?: string
  required?: boolean
  onChange?: (val: string) => void
}

function DatePicker({ label, name, errors, control, required = false }: DatePickerProps) {
  const hasError = errors && name && !!errors[name]

  return (
    <div className="text-field-container">
      {!!label && (
        <label className="text-field-label">
          {label}
          {required ? '*' : ''}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { onChange, value, ref } }) => (
          <ReactDatePicker
            ref={ref}
            className={hasError ? 'error' : ''}
            onChange={onChange}
            selected={value ? new Date(value) : null}
            dateFormat="dd/MM/yyyy"
          />
        )}
      />
    </div>
  )
}

export default DatePicker
