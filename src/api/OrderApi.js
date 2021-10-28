import axios from 'axios'
import { useEffect, useState } from 'react'

function CategoriesApi() {
    const [orders, setOrders] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {
        const res = await axios.get("/orders")
        if (res && res.data) setOrders(res.data)
    }
    useEffect(() => {
        getCategories()
    }, [callBack])
    return {
        orders: [orders, orders],
        callBack: [callBack, setCallBack]
    }
}

export default CategoriesApi
