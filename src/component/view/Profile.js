import { apiInstance } from '../../baseApi'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const { id } = JSON.parse(localStorage.getItem('login_admin'))

    const [store, setStore] = useState('')

    const [user, setUser] = useState('')
    const getStore = async () => {
        const res = await apiInstance.get(` /store/user/${id}`)
        if (res && res.data) setStore(res.data)
    }
    const getUser = async () => {
        const res = await apiInstance.get(`/users/${id}`)
        if (res && res.data) setUser(res.data)
    }
    useEffect(() => {
        getStore()
        getUser()
    }, [])

    return (
        <div className='profile'>

            <div className='info_store'>
                <div className='img_store'>
                    <img src={store && store.logo} alt='' style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }} />

                </div>
                <div className='name_store'>{store && store.name}</div>
                <div className='date_store'><span>Ngày thành lập:</span> {store && store.dateStore}</div>
            </div>
            <div className='info_user'>
                <h3 className='text-center'>Thông tin tài khoản</h3>
                <div className='name_user'><span>Tên tài khoản :</span> {user && user.name}</div>
                <div className='phone_user'><span>Số điện thoại :</span> {user && user.phone}</div>
                <div className='email_user'><span>Email :</span> {user && user.email}</div>
                <div className='address_user'><span>Địa chỉ :</span> {user && user.address}</div>
            </div>
        </div>
    )
}

export default Profile
