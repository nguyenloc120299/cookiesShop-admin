import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
const HeaderTitle = ({ title, onChaneShowMoDal }) => {
    return (
        <div className='header-title' style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px'

        }}>
            <div className='w-100 d-flex justify-content-center align-items-center'>
                <h5 className='font-weight-bold font-style-italic'>Danh sách {title}</h5>
            </div>

            <div className='' style={{
                color: 'black',
                fontSize: '20px'
            }}>

                <MdAddCircleOutline onClick={() => onChaneShowMoDal('add')} style={{
                    fontSize: '30px'
                }} />
            </div>
        </div>

    )
}

export default HeaderTitle
