import React from 'react'
import './styles.css'


export const Button = ({text, onClick, disabled}) => {
  return (
    <button className='custom-btn' disabled={disabled} onClick={onClick}>{text}</button>
  )
}
