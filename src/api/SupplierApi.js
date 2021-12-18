import { useEffect, useState } from 'react'
import { apiInstance } from '../baseApi'
function SupplierApi() {
    const [suppliers, setSuppliers] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getSupplier = async () => {
        const res = await apiInstance.get("/suppliers")
        if (res && res.data) setSuppliers(res.data)
    }
    useEffect(() => {
        getSupplier()
    }, [callBack])
    return {
        suppliers: [suppliers, setSuppliers],
        callBack: [callBack, setCallBack]
    }
}

export default SupplierApi
