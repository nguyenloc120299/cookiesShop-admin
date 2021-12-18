import { useEffect, useState } from 'react'
import { apiInstance } from '../baseApi'
function CategoriesApi() {
    const [categories, setCategories] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {
        const res = await apiInstance.get("/categories")
        if (res && res.data) setCategories(res.data)
    }
    useEffect(() => {
        getCategories()
    }, [callBack])
    return {
        categories: [categories, setCategories],
        callBack: [callBack, setCallBack]
    }
}

export default CategoriesApi
