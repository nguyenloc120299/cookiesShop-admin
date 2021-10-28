import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../GlobalContext'
import './order.css'
const Orders = () => {
    const context = useContext(GlobalContext)
    const [orders] = context.ordersApi.orders
    const totalItem = 10;
    const [pageNumber, setPageNumber] = useState(0)
    const pageCount = Math.ceil(orders.length / totalItem);


    const PageVisited = pageNumber * totalItem
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const dislayTable = orders.slice(PageVisited, totalItem + PageVisited).map(item => (

        <tr key={item.id}>
            <td style={item.payments === 1 ? { color: 'green', fontWeight: 'bold' } :
                { color: 'blueviolet', fontWeight: 'bold' }
            }>{item.payments === 0 ? 'Online' : "Trực tiếp"}</td>
            <td >{item.deliveryaddress}</td>
            <td>{item.transportfee}</td>
            <td>{new Date(item.dateorder).toLocaleDateString()}</td>
            <td>{item.namecustomer}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.listOrderDetail.reduce((prev, item) => {
                return prev + item.discount
            }, 0)}</td>
            {/* <td><button className='btn-detail-1' onClick={() => onChaneShowMoDal('edit', item.id)}>Chỉnh sửa</button></td>
            <td><button className='btn-detail-2'>Xem sản phẩm</button></td>
            {/* <ButtonTable onChaneShowMoDal={onChaneShowMoDal} item={item} /> */}
        </tr>

    ))
    return (
        <div className='orders m-5'>
            <div className='text-center' style={{
                fontSize: '1.5rem',
                fontWeight: 'bold'
            }}>Danh sách đơn hàng</div>

            <div className='row mt-3'>
                <table className='table-hover table'>

                    <thead >
                        <tr>

                            <th scope='col'>Thanh toán</th>
                            <th scope='col'>Địa chỉ</th>
                            <th scope='col'>Phí vận chuyển</th>
                            <th scope='col' >Ngày đặt</th>
                            <th scope='col'>Tên khách hàng</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Số điện thoại</th>
                            <th scope='col'>Tổng tiền</th>


                            <th scope='col'></th>
                            <th scope='col'></th>

                        </tr>

                    </thead>
                    <tbody className='mt-4'>
                        {dislayTable}
                    </tbody>
                </table>

            </div>
        </div>

    )
}

export default Orders
