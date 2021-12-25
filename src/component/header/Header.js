import React from 'react'
import './header.css'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Link } from 'react-router-dom'
const Header = ({ showMenu }) => {
    const res = JSON.parse(localStorage.getItem('login_admin'))
    const logout = () => {
        localStorage.setItem('login_admin', false)
        window.location.href = '/'
    }

    return (
        <div className='header'>

            <div className='menu'>
                <BiMenuAltLeft onClick={() => showMenu()} />
            </div>
            <div className='info'>
                <div className="dropdown">
                    <span style={{ fontWeight: 'bold' }} className='dropdown-toggle' id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <span>
                            <img src='./analytics.png' alt='' style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} />
                        </span>  {res && res.name}</span>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {
                            !(res.token && res.roles[0].authority === 'Admin') && <li><Link to='/profile' className="dropdown-item" type="button">Profile</Link></li>
                        }

                        <li><button className="dropdown-item" type="button" onClick={() => logout()}>Đăng xuất</button></li>
                    </ul>
                </div>

            </div>


        </div>
    )
}

export default Header
