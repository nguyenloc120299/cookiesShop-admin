import axios from 'axios'
import { useEffect, useState } from 'react'

function CategoriesApi() {
    const [products, setProducts] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {
        const res = await axios.get("/products")
        if (res && res.data) setProducts(res.data)
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
