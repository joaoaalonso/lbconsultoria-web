import React from 'react'
import ReactSelect from 'react-select'
import { Controller } from 'react-hook-form'

interface Options {
    label: string;
    value: string;
}

interface SelectProps {
    errors?: any;
    name: string;
    control: any;
    label?: string;
    options: Options[];
    required?: boolean;
    isMulti?: boolean;
    isClearable?: boolean;
    onChange?: (value: string) => void;
}

const Select = ({ name, label, errors, options, control, onChange, isMulti = false, isClearable = false, required = false }: SelectProps) => {
    const hasError = errors && name && !!errors[name]

    const getOptionBackgroundColor = (state: any) => {
        if (state.isSelected) {
            return '#ff19d5'
        }
        return state.isFocused ? '#ffd3f7' : 'white'
    }

    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: getOptionBackgroundColor(state)
        }),
        control: (provided: any) => ({
            ...provided,
            border: `1px solid ${hasError ? 'red' : 'hsl(0, 0%, 80%)'}`,
        })
    }

    return (
        <div>
            {!!label && 
                <label style={{ fontSize: 14 }}>{label}{required ? '*' : ''}</label>
            }
            <Controller
                name={name}
                control={control}
                rules={{ required }}
                render={({ field: { onChange, value, ref } }) => (
                    <ReactSelect
                        ref={ref}
                        isMulti={isMulti}
                        isClearable={isClearable}
                        onChange={(val: any) => {
                            isMulti ? onChange(val.map(v => v.value)) : onChange(val?.value)
                        }}
                        options={options}
                        placeholder={null}
                        isSearchable={true}
                        styles={customStyles}
                        noOptionsMessage={() => 'Nenhuma opção'} 
                    />
                )}
            />
        </div>
    )
}

export default Select