import React from 'react'

const HeaderTitle = ({ title, onChaneShowMoDal }) => {
    return (
        <div className='header-title' style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px'

        }}>
            <div className=''>
                <h5>Danh sách {title}</h5>
            </div>
            <div className='' style={{
                color: 'green',
                fontSize: '20px'
            }}>

                <i className="fas fa-plus" onClick={() => onChaneShowMoDal('add')} />
            </div>
        </div>

    )
}

export default HeaderTitle
