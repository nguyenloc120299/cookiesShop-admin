import React from 'react'
import './loading.css'
const Loading = () => {
    return (
        <div className='position-absolute' style={{
            top: '50%',
            left: "50%",
            transform: 'translate(-50%,-50%)',
            zIndex: '999999999'
        }}>
            <div class="loadingio-spinner-spinner-x6iiqkj6bvf"><div class="ldio-bgubqatjvl">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>
        </div>

    )
}

export default Loading
