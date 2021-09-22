import React from 'react'
import { Link } from 'react-router-dom'
import './navabar.css'
import { AiFillDashboard } from 'react-icons/ai'
import { VscAccount } from "react-icons/vsc";
import { ImListNumbered } from 'react-icons/im'
import { BsBag } from 'react-icons/bs'
const Navabar = ({ isMenu, showMenu }) => {
    return (
        <div className='navabar ' style={isMenu ? { left: '0' } : { display: '-100%' }} >
            <div className='close-menu' onClick={() => showMenu()}>X</div>
            <div className='logo'>
                <Link to='/' ><h2 style={{
                    border: "1px solid",
                    padding: "5px"
                }}>Cookies</h2></Link>
            </div>
            <div className='links'>
                <ul>
                    <li><Link to='/'> <AiFillDashboard className='icon-nvarbar' />Dashboard</Link></li>
                    <li><Link to='/product-manager'> <ImListNumbered className='icon-nvarbar' />Quản lý sản phẩm</Link></li>
                    <li><Link to='/user'><VscAccount className='icon-nvarbar' />Quản lý người dùng</Link></li>
                    <li><Link to='/order'><BsBag className='icon-nvarbar' />Quản lý đơn hàng</Link></li>

                </ul>
            </div>
        </div>
    )
}

export default Navabar
