import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navabar.css'
import { AiFillDashboard } from 'react-icons/ai'
import { VscAccount } from "react-icons/vsc";
import { ImListNumbered } from 'react-icons/im'
import { BsBag } from 'react-icons/bs'
const Navabar = ({ isMenu, showMenu }) => {
    const res = JSON.parse(localStorage.getItem('login_admin'))
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
                    <li><NavLink exact activeClassName='active_links' to='/'> <AiFillDashboard className='icon-nvarbar' />Dashboard</NavLink></li>
                    <li><NavLink exact activeClassName='active_links' to='/product-manager'> <ImListNumbered className='icon-nvarbar' />Quản lý sản phẩm</NavLink></li>
                    {
                        (res.token && res.roles[0].authority === 'Admin') &&
                        <li><NavLink exact activeClassName='active_links' to='/user'><VscAccount className='icon-nvarbar' />Quản lý người dùng</NavLink></li>
                    }
                    <li><NavLink exact activeClassName='active_links' to='/orders'><BsBag className='icon-nvarbar' />Quản lý đơn hàng</NavLink></li>

                </ul>
            </div>
        </div>
    )
}

export default Navabar
