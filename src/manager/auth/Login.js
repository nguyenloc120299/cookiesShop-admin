import { apiInstance } from '../../baseApi'
import React, { useState } from 'react'

const Login = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''
    })
    const handleInput = e => {
        const { name, value } = e.target

        setUserLogin({ ...userLogin, [name]: value })
    }
    const onSubmitLogin = async () => {
        try {
            setIsLogin(true)
            const res = await apiInstance.post('/signin', { ...userLogin })
            // localStorage.setItem('login_admin', true)
            localStorage.setItem('login_admin', JSON.stringify(res.data))
            window.location.href = '/'
        } catch (error) {

        }

    }
    return (
        <div className='login mt-5'>
            <h2 className='text-center' style={{

                padding: '5px'
            }}>Cookies Shop</h2>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" className="form-control"
                    name='username'
                    value={userLogin.username}
                    onChange={handleInput}
                />

            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control"
                    name='password'
                    value={userLogin.password}
                    onChange={handleInput}
                />
            </div>

            <button className="btn btn-primary w-100" onClick={() => onSubmitLogin()}

            >Đăng nhập</button>


        </div>
    )
}

export default Login
