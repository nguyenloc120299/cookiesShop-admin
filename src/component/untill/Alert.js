
import React, { useEffect } from 'react'
import './untill.css'
const Alert = ({ showAlert, type, msg }) => {
    useEffect(() => {
        const timeOut = setTimeout(() => {
            showAlert()
        }, 2000);
        return () => clearTimeout(timeOut)
    }, [showAlert])
    return (
        <div className='alert-untill'>

            <div className={`alert alert-${type} col-12 col-lg-4`} role="alert">
                {msg}
            </div>
        </div>

    )
}

export default Alert