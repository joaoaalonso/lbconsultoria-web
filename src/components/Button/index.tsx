import './index.css'

import React from 'react'

interface ButtonProps {
  text?: React.ReactNode
  onClick?: () => void
  style?: React.CSSProperties
  type?: 'submit' | 'button' | 'reset'
  variant?: 'primary' | 'secondary'
}

function Button({ text, variant = 'primary', type = 'button', onClick, style }: ButtonProps) {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={`button button-${variant}`}
      formNoValidate
    >
      {text}
    </button>
  )
}

export default Button
