import './index.css'
import 'react-datepicker/dist/react-datepicker.css'

import React, { type ComponentType } from 'react'
import { Controller, Control, FieldErrors, FieldValues, Path } from 'react-hook-form'
import ReactDatePickerImport from 'react-datepicker'

/** Vite prebundle pode expor o namespace CJS; `.default` é o DatePicker real. */
const ReactDatePicker = (
  typeof ReactDatePickerImport === 'function'
    ? ReactDatePickerImport
    : (ReactDatePickerImport as { default: ComponentType<unknown> }).default
) as ComponentType<Record<string, unknown>>

interface DatePickerProps<T extends FieldValues> {
  errors?: FieldErrors<T>
  name: Path<T>
  control: Control<T>
  label?: string
  required?: boolean
  onChange?: (val: string) => void
}

function DatePicker<T extends FieldValues>({
  label,
  name,
  errors,
  control,
  required = false,
}: DatePickerProps<T>) {
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
