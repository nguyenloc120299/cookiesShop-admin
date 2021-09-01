import axios from 'axios'
import { useEffect, useState } from 'react'

function SupplierApi() {
    const [suppliers, setSuppliers] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getSupplier = async () => {
        const res = await axios.get("/suppliers")
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
