import React from 'react'
import { Link } from 'react-router-dom'
import './navabar.css'
const Navabar = ({ isMenu, showMenu }) => {
    return (
        <div className='navabar ' style={isMenu ? { left: '0' } : { display: '-100%' }} >
            <div className='close-menu' onClick={() => showMenu()}>X</div>
            <div className='logo'>
                <Link to='/' ><h2>Logo</h2></Link>
            </div>
            <div className='links'>
                <ul>
                    <li><Link to='/'>Dashboard</Link></li>
                    <li><Link to='/product-manager'>Quản lý sản phẩm</Link></li>
                    <li><Link to='/'>Quản lý khách hàng</Link></li>

                </ul>
            </div>
        </div>
    )
}

export default Navabar
