import { apiInstance } from '../baseApi'
import { useEffect, useState } from 'react'

function CategoriesApi(isLogin) {
    const res = JSON.parse(localStorage.getItem('login_admin'))
    const [products, setProducts] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {

        if (res.token && res.roles[0].authority === 'Buyer') {
            const res1 = await apiInstance.get(`/products/users/${res.id}`)
            if (res1 && res1.data) setProducts(res1.data)
        }
        else {
            const res2 = await apiInstance.get(`/products`)
            if (res2 && res2.data) setProducts(res2.data)
        }

    }
    useEffect(() => {

        getCategories()

    }, [callBack])
    return {
        products: [products, setProducts],
        callBack: [callBack, setCallBack]
    }
}

export default CategoriesApi
