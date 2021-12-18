import { apiInstance } from '../baseApi'
import { useEffect, useState } from 'react'

function SupplierApi() {
    const [users, setUsers] = useState([])
    const [callBack, setCallBack] = useState(false)

    const getUsers = async () => {
        const res = await apiInstance.get("/users")
        if (res && res.data) setUsers(res.data)
    }
    useEffect(() => {
        getUsers()
    }, [callBack])
    return {
        users: [users, setUsers],
        callBack: [callBack, setCallBack]
    }
}

export default SupplierApi
