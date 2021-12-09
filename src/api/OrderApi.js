import axios from 'axios'
import { useEffect, useState } from 'react'

function CategoriesApi() {
    const [orders, setOrders] = useState([])
    const [callBack, setCallBack] = useState(false)
    const [type, setType] = useState(5)
    const auth = JSON.parse(localStorage.getItem('login_admin'))

    const getCategories = async (type) => {

        if (auth.token && auth.roles[0].authority === 'Admin') {
            const res = await axios.get("/orders")
            if (res && res.data) setOrders(res.data)
        }
        if (auth.token && auth.roles[0].authority === 'Buyer') {
            // let data = []
            if (type === 5) {
                const res2 = await axios.get(`/orderdetails/users/${auth.id}`)
                if (res2 && res2.data) setOrders(res2.data)
            } else {
                const res1 = await axios.get(`/orderdetails/users/${auth.id}/status/${type}`)
                if (res1 && res1.data) setOrders(res1.data)
            }
        }

    }

    useEffect(() => {
        if (auth && auth.token)
            getCategories(type)
    }, [callBack])
    return {
        orders: [orders, orders],
        callBack: [callBack, setCallBack],
        status: [type, setType]
    }
}

export default CategoriesApi
