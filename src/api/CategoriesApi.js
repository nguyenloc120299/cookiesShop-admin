import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CategoriesApi() {
    const [categories, setCategories] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getCategories = async () => {
        const res = await axios.get("/categories")
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
