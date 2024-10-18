import './index.css'

import React from 'react'
import InputMask from 'react-input-mask'
import { Controller } from 'react-hook-form'

interface TextFieldProps {
    errors?: any;
    name?: string;
    type?: string;
    value?: string;
    label?: string;
    register?: any;
    mask?: string;
    required?: boolean;
    disabled?: boolean;
    maxLength?: number;
    control?: any;
    placeholder?: string;
    onChange?: (value: string) => void;
}

function TextField({ 
    value, 
    name, 
    label, 
    errors, 
    control, 
    placeholder, 
    mask,
    maxLength,
    register, 
    onChange, 
    type = 'text', 
    required = false,
    disabled = false
}: TextFieldProps) {
    const registerConfigs = !!(register && name) ? register(name, { required }) : {};

    const hasError = errors && name && !!errors[name]

    const Tag = type === 'textarea' ? 'textarea' : 'input'

    const maskChar = '_'

    const unmaskValue = (value: string) => {
        if (!mask) return value

        let unmaskedValue = '';
        for(let i = 0; i < value.length; i++) {
  
            const isValueChar = mask[i] === '9' || mask[i] === 'a' || mask[i] === '*';
            const isMaskChar = value[i] === maskChar;
  
            if (isValueChar && !isMaskChar)
                unmaskedValue += value[i];
        }
  
        return unmaskedValue;
    }

    const handleChange = (internalOnChange: any) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = unmaskValue(event.target.value)
            internalOnChange(value, event)
            onChange && onChange(value)
        }
    }

    function renderInput() {
        if (name && control) {
            return (
                <Controller
                    control={control}
                    name={name}
                    rules={{ required }}
                    render={({ field: { onChange, value, ref } }) => (
                        <InputMask
                            ref={ref}
                            maskChar=""
                            mask={mask}
                            type={type}
                            value={value}
                            disabled={disabled}
                            maxLength={maxLength}
                            onChange={handleChange(onChange)}
                            className={`text-field ${hasError ? 'text-field-error' : ''}`}
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
                onChange={e => {
                    onChange && onChange(e.target.value)
                }}
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