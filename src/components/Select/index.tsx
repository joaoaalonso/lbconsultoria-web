import React from 'react'
import ReactSelect, { StylesConfig } from 'react-select'
import { Controller, Control, FieldErrors, FieldValues } from 'react-hook-form'

interface Options {
  label: string
  value: string
}

interface SelectProps {
  errors?: FieldErrors<any>
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  label?: string
  options: Options[]
  required?: boolean
  isMulti?: boolean
  isClearable?: boolean
  onChange?: (value: string) => void
}

const Select = ({
  name,
  label,
  errors,
  options,
  control,
  onChange,
  isMulti = false,
  isClearable = false,
  required = false,
}: SelectProps) => {
  const hasError = errors && name && !!errors[name]

  const getOptionBackgroundColor = (state: { isSelected: boolean; isFocused: boolean }) => {
    if (state.isSelected) return 'var(--color-primary)'
    return state.isFocused ? '#ffd3f7' : 'white'
  }

  const customStyles: StylesConfig<Options> = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: getOptionBackgroundColor(state),
    }),
    control: (provided) => ({
      ...provided,
      border: `1px solid ${hasError ? 'red' : 'hsl(0, 0%, 80%)'}`,
    }),
  }

  return (
    <div>
      {!!label && (
        <label style={{ fontSize: 14 }}>
          {label}
          {required ? '*' : ''}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { onChange, value, ref } }) => (
          <ReactSelect
            ref={ref}
            isMulti={isMulti}
            isClearable={isClearable}
            onChange={(val) => {
              isMulti
                ? onChange((val as Options[]).map((v) => v.value))
                : onChange((val as Options | null)?.value)
            }}
            options={options}
            placeholder={null}
            isSearchable={true}
            styles={customStyles}
            value={options.find((c) => c.value === value)}
            noOptionsMessage={() => 'Nenhuma opção'}
          />
        )}
      />
    </div>
  )
}

export default Select
