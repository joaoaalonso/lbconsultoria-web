import './index.css'

import React from 'react'
import { Controller } from 'react-hook-form'

interface TextFieldProps {
    errors?: any;
    name?: string;
    type?: string;
    value?: string;
    label?: string;
    register?: any;
    required?: boolean;
    disabled?: boolean;
    control?: any;
    mask?: string
    placeholder?: string;
    onChange?: (value: string) => void;
}

function TextField({ 
    value, 
    name, 
    label, 
    errors, 
    mask, 
    control, 
    placeholder, 
    register, 
    onChange, 
    type = 'text', 
    required = false,
    disabled = false
}: TextFieldProps) {
    const registerConfigs = !!(register && name) ? register(name, { required }) : {};

    function handleOnChange(e: any) {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const hasError = errors && name && !!errors[name]

    const Tag = type === 'textarea' ? 'textarea' : 'input'

    function renderInput() {
        if (mask && name && control) {
            return (
                <Controller
                    control={control}
                    name={name}
                    rules={{ required }}
                    render={({ field: { onChange, value, ref } }) => (
                        <input 
                            ref={ref}
                            type={type}
                            className={`text-field ${hasError ? 'text-field-error' : ''}`}
                            onChange={onChange}
                            value={value}
                            disabled={disabled}
                        />
                    )}
                />
            )
        }

        return (
            <Tag
                rows={3}
                type={type}
                value={value}
                className={`text-field ${hasError ? 'text-field-error' : ''}`}
                placeholder={placeholder}
                onChange={handleOnChange}
                disabled={disabled}
                {...registerConfigs}
            />
        )
    }

    return (
        <div className='text-field-container'>
            {!!label && 
                <label className='text-field-label'>{label}{required ? '*' : ''}</label>
            }
            {renderInput()}
        </div>
    )
}

export default TextField