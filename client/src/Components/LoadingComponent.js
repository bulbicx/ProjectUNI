import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import './global.css'

export const Loading = () => {
    return (
        <div style={{display: 'flex', padding: '1em', fontSize: '5rem'}}>
            <FaSpinner icon="spinner" className="spinner" /> 
            <p style={{fontSize: '3rem', marginLeft: '1em'}}>Loading . . .</p>
        </div>
    )
}