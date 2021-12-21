
import React, { useEffect, useState } from 'react'
import './store.css'
import { apiInstance } from '../../baseApi'
import swal from 'sweetalert'
import Loading from '../../valid/Loading'
const Store = () => {
    const [stores, setStores] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getStore = async () => {
        const res = await apiInstance.get('/admin/stores')
        setStores(res.data.listSotre);
    }
    useEffect(() => {
        getStore()
    }, [])

    const deleteStore = async (id) => {
        setIsLoading(true)
        await apiInstance.delete(`/store/${id}`)
        setIsLoading(false)
        swal('Đã xóa', '', 'success')
    }
    return (
        <div className='store mt-5'>
            {
                isLoading && <Loading />
            }
            <h5 className='text-left ml-3'>Thông tin tất cả cửa hàng</h5>
            <div className='row p-5'>
                <table className='table-hover table'>

                    <thead >
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col' >Logo</th>
                            <th scope='col'>Tên cửa hàng</th>
                            <th scope='col'>Người đại diện</th>
                            <th scope='col'>Địa chỉ</th>
                            <th scope='col'>Số điện thoại</th>
                            <th scope='col'>Ngày tạo</th>
                            <th scope='col'></th>
                        </tr>

                    </thead>
                    <tbody className='mt-4'>
                        {
                            stores && stores.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {index}
                                    </td>
                                    <td>
                                        <img src={item.logo} alt='' style={{
                                            width: '5rem'
                                        }} />
                                    </td>
                                    <td>
                                        {
                                            item.name
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.representative
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.address
                                        }
                                    </td>
                                    <td>
                                        {
                                            item.phone
                                        }
                                    </td>
                                    <td>
                                        {
                                            new Date(item.sortdate).toLocaleDateString()
                                        }
                                    </td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => deleteStore(item.id)}>Xóa</button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Store
