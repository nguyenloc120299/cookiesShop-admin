import React from 'react'
import { AiOutlineCarryOut } from 'react-icons/ai'
const ButtonTable = ({ onChaneShowMoDal, item }) => {

    return (
        <>
            <td><button className='btn-detail-1' onClick={() => onChaneShowMoDal('edit', item.id)}><i className="far fa-edit" /></button></td>
            <td><button className='btn-detail-2'><AiOutlineCarryOut style={{
                fontSize: '22px'
            }} /></button></td>
        </>
    )
}

export default ButtonTable
