import React from 'react'
import './header.css'
import { BiMenuAltLeft } from 'react-icons/bi'
const Header = ({ showMenu }) => {
    return (
        <div className='header'>

            <div className='menu'>
                <BiMenuAltLeft onClick={() => showMenu()} />
            </div>
            <div className='info'>
                <h5>Xin chào : Nguyễn Lộc</h5>

            </div>


        </div>
    )
}

export default Header
