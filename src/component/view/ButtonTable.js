import React from 'react'


const ButtonTable = ({ onChaneShowMoDal, item }) => {

    return (
        <>
            <td><button className='btn-detail-1' onClick={() => onChaneShowMoDal('edit', item.id)}>Chỉnh sửa</button></td>
            <td><button className='btn-detail-2'>Xem sản phẩm</button></td>
        </>
    )
}

export default ButtonTable
