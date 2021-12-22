import { apiInstance } from '../baseApi'
import { useEffect, useState } from 'react'

function CategoriesApi(isLogin) {
    const [orders, setOrders] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [type, setType] = useState(5)

    const getCategories = async (type) => {



        const auth = JSON.parse(localStorage.getItem('login_admin'))
        console.log(auth); if (auth && auth.roles[0].authority === 'Admin') {
            const res = await apiInstance.get("/orders")
            if (res && res.data)

                setOrders(res.data)
        }
        if (auth && auth.roles[0].authority === 'Buyer') {
            // let data = []
            if (type === 5) {
                const res2 = await apiInstance.get(`/orderdetails/users/${auth.id}`)
                if (res2 && res2.data) setOrders(res2.data)
            } else {
                const res1 = await apiInstance.get(`/orderdetails/users/${auth.id}/status/${type}`)
                if (res1 && res1.data) setOrders(res1.data)
            }
        }


    }
    useEffect(() => {
        if (isLogin)
            getCategories(type)
    }, [callBack, type, isLogin])
    return {
        orders: [orders, orders],
        callBack: [callBack, setCallBack],
        status: [type, setType]
    }
}

export default CategoriesApi
