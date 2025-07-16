import React from 'react'
import './Input.Styles.scss'

const Input = ({placeholder, type, value, onChange, white, icon}) => {
    return (
        <div className="input-container">
            <label className="input">
                <input className="input__field" type={type} value={value} placeholder=" " onChange={onChange} />
                <span className="input__label" style={{background: white ? '#fff' : '#E7D3B2'}}>{placeholder}</span>
                {icon && <span className='icon-container'>{icon}</span>}
            </label>
        </div>
    )
}

export default Input