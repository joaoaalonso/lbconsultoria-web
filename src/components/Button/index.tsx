import './index.css'

import React from 'react'

interface ButtonProps {
    text?: any;
    onClick?: () => void;
    style?: any;
    type?: 'submit' | 'button' | 'reset';
    variant?: 'primary' | 'secondary';
}

function Button({text, variant = 'primary', type = 'button', onClick, style}: ButtonProps) {
    function handleOnClick(e: any) {
        if (onClick) {
            onClick()
        }
    }

    return (
        <button
            style={style}
            type={type}
            onClick={handleOnClick}
            className={`button button-${variant}`}
            formNoValidate
        >
            {text}
        </button>
    )
}

export default Button