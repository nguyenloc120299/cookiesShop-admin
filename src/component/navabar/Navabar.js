import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './navabar.css'
import { AiFillDashboard, FaStore, FaUserAlt, MdLocalShipping } from 'react-icons/all'
import { BsFillBagFill, BsUser } from 'react-icons/bs'
import { ImListNumbered } from 'react-icons/im'
import { BsBag } from 'react-icons/bs'
const Navabar = ({ isMenu, showMenu }) => {
    const res = JSON.parse(localStorage.getItem('login_admin'))
    return (
        <div className='navabar ' style={isMenu ? { width: '0' } : { width: '17%' }} >
            <div className='close-menu' onClick={() => showMenu()}>X</div>
            <div className='logo'>
                <Link to='/' ><h2 style={{

                    padding: "5px"
                }}>Cookies</h2></Link>
            </div>
            <div className='links'>
                <ul>
                    <li><NavLink exact activeClassName='active_links' to='/'> <AiFillDashboard className='icon-nvarbar' />Dashboard</NavLink></li>
                    <li><NavLink exact activeClassName='active_links' to='/product-manager'> <BsFillBagFill className='icon-nvarbar' />Quản lý sản phẩm</NavLink></li>
                    {
                        (res.token && res.roles[0].authority === 'Admin') && <>
                            <li><NavLink exact activeClassName='active_links' to='/user'><FaUserAlt className='icon-nvarbar' />Quản lý người dùng</NavLink></li>
                            <li><NavLink exact activeClassName='active_links' to='/store'><FaStore className='icon-nvarbar' />Quản lý cửa hàng</NavLink></li>
                        </>
                    }
                    <li><NavLink exact activeClassName='active_links' to='/orders'><MdLocalShipping className='icon-nvarbar' />Quản lý đơn hàng</NavLink></li>

                </ul>
            </div>
        </div>
    )
}

export default Navabar
