import React from 'react'
import './styles.css'


export const InputComponent = ({type, state, setState, placeholder, required}) => {
  return (
    <input type={type}
    value={state}
    onChange={(e)=> setState(e.target.value)}
    placeholder={placeholder}
    required={required}
    className='custom-input'
     />
  )
}
