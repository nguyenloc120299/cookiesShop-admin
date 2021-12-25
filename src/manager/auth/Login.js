import { apiInstance } from '../../baseApi'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import { GlobalContext } from '../../GlobalContext'
import Loading from '../../valid/Loading'
const Login = () => {
    // const [isLogin, setIsLogin] = useState(false)
    const context = useContext(GlobalContext)
    const [isLogin, setIsLogin] = context.isLogin
    const [user] = context.usersApi.users
    const [isLoding, setIsLoading] = useState(false)

    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''
    })
    const history = useHistory()
    const handleInput = e => {
        const { name, value } = e.target

        setUserLogin({ ...userLogin, [name]: value })
    }
    const onSubmitLogin = async () => {
        try {
            setIsLoading(true)
            const res = await apiInstance.post('/signin', { ...userLogin })
            setIsLoading(false)
            const [userLogin1] = user.filter(item => {
                return item.id === res.data.id
            })
            if (userLogin1.status === 1) {
                localStorage.setItem('login_admin', JSON.stringify(res.data))
                setIsLogin(!isLogin)
            }

            else {
                swal('Chưa xác thực email', '', 'warning')
            }

            history.push('/')
            // window.location.href = '/'
        } catch (error) {
            swal('Tài khoản mật khẩu sai', '', 'error')
        }

    }
    return (
        <div className='login mt-5'>
            {
                isLoding && <Loading />
            }
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
