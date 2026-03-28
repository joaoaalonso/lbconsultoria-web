import React from 'react'
import ReactSelect, { StylesConfig } from 'react-select'
import { Controller, Control, FieldErrors, FieldValues, Path } from 'react-hook-form'

interface Options {
  label: string
  value: string
}

interface SelectProps<T extends FieldValues> {
  errors?: FieldErrors<T>
  name: Path<T>
  control: Control<T>
  label?: string
  options: Options[]
  required?: boolean
  isMulti?: boolean
  isClearable?: boolean
  onChange?: (value: string) => void
}

function Select<T extends FieldValues>({
  name,
  label,
  errors,
  options,
  control,
  isMulti = false,
  isClearable = false,
  required = false,
}: SelectProps<T>) {
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
              if (isMulti) {
                onChange((val as Options[]).map((v) => v.value))
              } else {
                onChange((val as Options | null)?.value)
              }
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
